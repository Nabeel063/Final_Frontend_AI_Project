import React, { useState } from "react";
import ViewInsightDetail from "./ViewInsightDetail";
import { Calendar } from "lucide-react";

function ReportModal({ selectedCandidate, setOpenModal, setSelectedCandidate }) {
    const [showInsight, setShowInsight] = useState(false);

    if (!selectedCandidate) return null;



    const examDate = (() => {
        const raw = selectedCandidate.raw || {};
        const dateValue = selectedCandidate.exam_date || raw.created_at || null;
        if (!dateValue) return "—";
        try {
            const d = new Date(dateValue);
            if (isNaN(d.getTime())) return String(dateValue);
            return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        } catch {
            return "—";
        }
    })();

    const skills = (() => {
        let s = selectedCandidate.skills;
        if (typeof s === 'string' && s.trim()) {
            s = s.split(',').map(x => x.trim()).filter(Boolean);
        }
        return Array.isArray(s) && s.length > 0 ? s : [];
    })();

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-auto p-4 sm:p-6 bg-black/40"
            onClick={() => {
                setOpenModal(false);
                setSelectedCandidate(null);
            }}
        >
            <div
                className="relative w-full max-w-5xl max-h-[90vh] overflow-auto rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    aria-label="Close"
                    onClick={() => {
                        setOpenModal(false);
                        setSelectedCandidate(null);
                    }}
                    className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 pb-4 lg:pb-6 border-b border-gray-100 gap-4">
                        <div className="flex gap-3 sm:gap-4 items-center w-full">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg sm:text-xl uppercase shrink-0">
                                {selectedCandidate.name?.substring(0, 2) || "NS"}
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight truncate">{selectedCandidate.jobTitle || "Developer"}</h2>
                                <p className="text-sm sm:text-base text-gray-400 font-medium truncate">{selectedCandidate.company || "—"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
                        <div className="space-y-5">
                            {[
                                { label: "Name", value: selectedCandidate.name },
                                { label: "Job Title", value: selectedCandidate.jobTitle },
                                { label: "Email", value: selectedCandidate.email || "—" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center">
                                    <span className="w-32 text-gray-900 font-bold text-base">{item.label} :</span>
                                    <span className="text-gray-500 font-medium">{item.value || "—"}</span>
                                </div>
                            ))}

                            <div className="flex items-center">
                                <span className="w-32 text-gray-900 font-bold text-base">Exam Date :</span>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span className={`font-medium ${examDate !== '—' ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {examDate}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-0">
                                <span className="w-full sm:w-32 text-gray-900 font-bold text-base shrink-0 sm:pt-1">Priority :</span>
                                 <div className="flex flex-wrap gap-2">
                        {(Array.isArray(selectedCandidate.skills) && selectedCandidate.skills.length ? selectedCandidate.skills : ['Wireframing', 'Prototyping', 'User Research']).map((s, i) => (
                          <span key={`${s}-${i}`} className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                            {s}
                          </span>
                        ))}
                      </div>
                            </div>

                            {/* <div className="flex items-center">
                                <span className="w-32 text-gray-900 font-bold text-base">Marks :</span>
                                <span className="text-gray-500 font-medium">{selectedCandidate.marks || "—"}</span>
                            </div> */}

                            <div className="pt-4 sm:pt-6">
                                <button 
                                    onClick={() => setShowInsight(true)}
                                    className="w-full lg:w-80 py-3 sm:py-3.5 bg-gradient-to-r from-[#7058C5] to-[#7058C5] hover:from-[#5d47a8] hover:to-[#6050b8] text-white font-semibold rounded-xl transition-all shadow-md active:scale-95 text-sm sm:text-base"
                                >
                                    View Insight
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#FBFBFB] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between border border-gray-50 gap-6 sm:gap-4 w-full">
                            <div className="relative flex items-center justify-center shrink-0">
                                {(() => {
                                    const marksArray = (selectedCandidate.marks || '0/0').split('/');
                                    const obtained = parseFloat(marksArray[0]) || 0;
                                    const total = parseFloat(marksArray[1]) || 1;
                                    const totalQuestions = selectedCandidate.totalQuestion || selectedCandidate.raw?.results_data?.length || 1;
                                    const correct = selectedCandidate.correct ?? selectedCandidate.raw?.results_data?.filter(r => r && r.is_correct).length ?? 0;
                                    
                                    const unattemptedCount = selectedCandidate.unattempted ?? selectedCandidate.raw?.results_data?.filter(r => {
                                        if (!r) return false;
                                        const ans = r.candidate_answer ?? r.given_answer;
                                        return ans === null || ans === undefined || ans === '';
                                    }).length ?? 0;

                                    const incorrect = selectedCandidate.incorrect ?? (totalQuestions - correct - unattemptedCount);
                                    
                                    const correctPercent = totalQuestions > 0 ? (correct / totalQuestions) * 100 : 0;
                                    const incorrectPercent = totalQuestions > 0 ? (incorrect / totalQuestions) * 100 : 0;
                                    const unattemptedPercent = totalQuestions > 0 ? (unattemptedCount / totalQuestions) * 100 : 0;
                                    
                                    return (
                                        <div className="relative w-48 h-48 flex items-center justify-center">
                                            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                                {(() => {
                                                    const radius = 80;
                                                    const strokeWidth = 32;
                                                    const circumference = 2 * Math.PI * radius;
                                                    const R = strokeWidth / 12;
                                                    
                                                    const rawSegments = [
                                                        { value: correctPercent, color: "#23FF68" },
                                                        { value: incorrectPercent, color: "#F39E9E" },
                                                        { value: unattemptedPercent, color: "#FFDE85" }
                                                    ].filter(s => s.value > 0);
                                                    
                                                    const gapPercent = rawSegments.length > 1 ? 1 : 0; 
                                                    const totalGapPercent = gapPercent * rawSegments.length;
                                                    const scale = (100 - totalGapPercent) / 100;
                                                    
                                                    let currentOffsetPercent = 0;
                                                    
                                                    return rawSegments.map((seg, idx) => {
                                                        const segPercent = seg.value * scale;
                                                        const dashLength = (segPercent / 100) * circumference;
                                                        const dashOffset = (currentOffsetPercent / 100) * circumference;
                                                        
                                                        currentOffsetPercent += segPercent + gapPercent;
                                                        
                                                        const isFullCircle = rawSegments.length === 1;
                                                        
                                                        // Adjust for strokeLinecap="round" overlap
                                                        const adjustedLength = Math.max(0.01, dashLength - 2 * R);
                                                        const adjustedOffset = dashOffset + R;
                                                        
                                                        return (
                                                            <circle
                                                                key={idx}
                                                                cx="96"
                                                                cy="96"
                                                                r={radius}
                                                                fill="none"
                                                                stroke={seg.color}
                                                                strokeWidth={strokeWidth}
                                                                strokeLinecap={isFullCircle ? "butt" : "semiRound"}
                                                                strokeDasharray={isFullCircle ? "none" : `${adjustedLength} ${circumference}`}
                                                                strokeDashoffset={isFullCircle ? 0 : -adjustedOffset}
                                                                className="transition-all duration-1000 ease-out"
                                                            />
                                                        );
                                                    });
                                                })()}
                                            </svg>
                                            <div className="relative z-10 w-36 h-36 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                                                <div className="flex items-baseline">
                                                    <span className="text-5xl font-black text-indigo-700">
                                                        {obtained.toFixed(0)}
                                                    </span>
                                                    <span className="text-xl font-bold text-gray-400 ml-1">
                                                        /{total.toFixed(0)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                            <div className="space-y-4 sm:space-y-6 flex flex-row sm:flex-col items-center sm:items-end justify-center gap-4 sm:gap-0 flex-wrap">
                                {[
                                    { color: "bg-[#23FF68]", label: "Correct", sub: "Answers" },
                                    { color: "bg-[#F39E9E]", label: "Wrong", sub: "Answers" },
                                    { color: "bg-[#FFDE85]", label: "Un-Attempted", sub: "Questions" },
                                ].map((legend, i) => (
                                    <div key={i} className="text-center sm:text-right flex-1 sm:flex-none">
                                        <div className={` w-10 sm:w-12 h-2.5 sm:h-3.5 ${legend.color} rounded-full mx-auto sm:ml-auto mb-1.5 sm:mb-1 shrink-0 `}> </div>
                                        <p className="text-[9px] sm:text-[11px] font-bold text-gray-500 leading-tight uppercase tracking-wider">
                                            {legend.label}<br className="hidden sm:block"/>
                                            <span className="sm:hidden"> </span>
                                            {legend.sub}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showInsight && (
                <div 
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-6"
                    onClick={() => setShowInsight(false)}
                >
                    <div 
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-3xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setShowInsight(false)}
                            className="absolute top-4 right-4 z-[120] p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <ViewInsightDetail candidate={selectedCandidate} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReportModal;