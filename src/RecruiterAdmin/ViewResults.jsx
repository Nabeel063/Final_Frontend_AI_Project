import React from "react";
import { X, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function ViewResults({ jobData, attempt, onClose }) {
    if (!attempt) return null;

    const cand = attempt.candidate || {};
    const name = cand.name || `${cand.firstName || ''} ${cand.lastName || ''}`.trim() || cand.fullName || cand.username || attempt.candidate_id || 'N/A';
    const email = cand.email || cand.emailAddress || cand.contact_email || cand.username || 'N/A';
    const phone = cand.phone || cand.mobile || cand.phoneNumber || 'N/A';

    const results = Array.isArray(attempt.results_data) ? attempt.results_data : [];
    const totalScore = attempt.totalScore || results.reduce((sum, q) => sum + (Number(q.score) || 0), 0);
    const maxScore = results.reduce((sum, q) => sum + (Number(q.positive_marking) || 1), 0) || 1;
    const percentage = ((totalScore / maxScore) * 100).toFixed(2);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
            <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 z-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                            Candidate Report
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {jobData?.jobTitle} <span className="mx-2 text-gray-300">|</span> {new Date(attempt.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    {/* Top Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-violet-50 border border-violet-100 p-5 rounded-2xl">
                            <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">Total Score</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-violet-600">{totalScore.toFixed(1)}</span>
                                <span className="text-sm text-violet-400 font-medium">/ {maxScore}</span>
                            </div>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl">
                            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Percentage</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-emerald-600">{percentage}%</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Phone Number:</span>
                            <span className="font-semibold text-gray-900">N/A</span>
                        </div>
                    </div>

                    {/* Candidate Info Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 border-l-4 border-violet-500 pl-3">Candidate Details</h3>
                            <div className="bg-gray-50 rounded-2xl p-6 grid grid-cols-1 gap-4">
                                <div className="flex justify-between items-center group">
                                    <span className="text-sm text-gray-500">Full Name</span>
                                    <span className="text-sm font-semibold text-gray-800">{name}</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-sm text-gray-500">Email Address</span>
                                    <span className="text-sm font-semibold text-gray-800 break-all">{email}</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-sm text-gray-500">Contact Number</span>
                                    <span className="text-sm font-semibold text-gray-800">{phone}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Max Score:</span>
                            <span className="font-semibold text-gray-900">N/A</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Percentage:</span>
                            <span className="font-semibold text-gray-900">N/A</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Status:</span>
                            <span className="font-semibold text-gray-900">N/A</span>
                        </div>
                    </div>

                    {/* Detailed Question Answers Section */}
                    <div className="space-y-6 pt-4 border-t border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <AlertCircle size={20} className="text-violet-500" />
                            Question-wise Breakdown
                        </h3>

                        <div className="space-y-8">
                            {results.map((q, idx) => {
                                const isCorrect = q.is_correct === true || q.score >= (q.positive_marking * 0.8);
                                const qType = String(q.type || q.question_type || '').toUpperCase();

                                return (
                                    <div key={idx} className="group relative bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-lg transition-all border-l-[6px]" style={{ borderLeftColor: isCorrect ? '#10b981' : (q.score > 0 ? '#f59e0b' : '#ef4444') }}>
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Question Info */}
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                                        Question {idx + 1} <span className="mx-2 opacity-30">|</span> {qType}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-sm font-bold ${isCorrect ? 'text-emerald-600' : (q.score > 0 ? 'text-amber-600' : 'text-red-600')}`}>
                                                            {q.score} / {q.positive_marking}
                                                        </span>
                                                        {isCorrect ? <CheckCircle2 size={18} className="text-emerald-500" /> : <XCircle size={18} className="text-red-500" />}
                                                    </div>
                                                </div>

                                                <h4 className="text-base font-semibold text-gray-800 leading-relaxed">
                                                    {q.question}
                                                </h4>

                                                <div className="grid grid-cols-1 gap-4 mt-6">
                                                    {/* Candidate Answer */}
                                                    <div className="space-y-2">
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Candidate's Response</p>
                                                        {qType === 'CODING' ? (
                                                            <pre className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
                                                                <code>{q.candidate_answer || '// No response provided'}</code>
                                                            </pre>
                                                        ) : (
                                                            <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm text-gray-700 font-medium">
                                                                {q.candidate_answer || <span className="italic opacity-50">No response provided</span>}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Expected Answer */}
                                                    <div className="space-y-2">
                                                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest pl-1">Expected / Reference Answer</p>
                                                        {qType === 'CODING' ? (
                                                            <div className="space-y-4">
                                                                <pre className="bg-emerald-900/5 text-emerald-800 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-emerald-100 shadow-sm">
                                                                    <code>{q.correct_answer || '// No reference provided'}</code>
                                                                </pre>
                                                                {(q.input_spec || q.output_spec || q.complexity_constraints) && (
                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                                                                        {q.input_spec && (
                                                                            <div className="space-y-1">
                                                                                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Input Spec</p>
                                                                                <p className="text-xs text-emerald-900 opacity-80">{q.input_spec}</p>
                                                                            </div>
                                                                        )}
                                                                        {q.output_spec && (
                                                                            <div className="space-y-1">
                                                                                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Output Spec</p>
                                                                                <p className="text-xs text-emerald-900 opacity-80">{q.output_spec}</p>
                                                                            </div>
                                                                        )}
                                                                        {q.complexity_constraints && (
                                                                            <div className="sm:col-span-2 space-y-1 border-t border-emerald-100/50 pt-2">
                                                                                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Complexity Constraints</p>
                                                                                <p className="text-xs font-mono text-emerald-900 opacity-80">{q.complexity_constraints}</p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="bg-emerald-50/50 border border-emerald-100/50 p-4 rounded-2xl text-sm text-emerald-800 font-semibold shadow-sm">
                                                                {q.correct_answer || <span className="italic opacity-50">No reference provided</span>}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Rubric / Key Words */}
                                                    {q.rubric && (
                                                        <div className="bg-amber-50/50 border border-amber-100/50 p-4 rounded-2xl shadow-sm">
                                                            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">Evaluation Rubric</p>
                                                            <p className="text-sm text-amber-900 leading-relaxed font-medium">{q.rubric}</p>
                                                            {q.expected_keywords && (
                                                                <div className="mt-3 flex flex-wrap gap-2">
                                                                    {String(q.expected_keywords).split(',').map((kw, i) => (
                                                                        <span key={i} className="px-2 py-1 bg-amber-100/80 text-amber-700 text-[9px] font-black uppercase rounded-md border border-amber-200">
                                                                            {kw.trim()}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Explanation */}
                                                    {q.explanation && (
                                                        <div className="bg-gray-50/80 border border-gray-100 p-4 rounded-2xl shadow-sm">
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Explanation</p>
                                                            <p className="text-sm text-gray-800 leading-relaxed italic">{q.explanation}</p>
                                                        </div>
                                                    )}

                                                    {/* Feedback */}
                                                    {q.feedback && (
                                                        <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-2xl">
                                                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">AI Evaluation Feedback</p>
                                                            <p className="text-sm text-blue-800 italic leading-relaxed">{q.feedback}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer and Close Button */}
                <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg shadow-gray-200"
                    >
                        Close Report
                    </button>
                </div>
            </div>
        </div>
    );
}
