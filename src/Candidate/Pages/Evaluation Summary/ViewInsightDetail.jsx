import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const ViewInsightDetail = ({ candidate }) => {
  const results = candidate?.raw?.results_data || [];
  
  const correctCount = results.filter(q => q?.is_correct).length;
  const unattemptedCount = results.filter(q => {
    if (!q) return false;
    const ans = q.candidate_answer ?? q.given_answer;
    return ans === null || ans === undefined || ans === '';
  }).length;
  const incorrectCount = results.length - correctCount - unattemptedCount;

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-sm font-sans text-slate-800">
      
      <header className="flex flex-col sm:flex-row sm:items-center p-4 sm:p-6 border-b gap-4 sm:gap-6 bg-gradient-to-r from-indigo-50 to-purple-50/30">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base shrink-0">
            {candidate?.name?.substring(0, 2)?.toUpperCase() || "NS"}
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-lg sm:text-xl leading-tight truncate">{candidate?.jobTitle || "Developer"}</h1>
            <p className="text-gray-500 text-sm sm:text-base truncate">{candidate?.company || "—"}</p>
          </div>
        </div>
        <div className="sm:ml-auto flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-xs sm:text-sm font-semibold text-indigo-600 rounded-full border border-indigo-100 shadow-sm">
            {results.length} Questions
          </span>
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-xs sm:text-sm font-semibold text-green-600 rounded-full border border-green-100 shadow-sm">
            {correctCount} Correct
          </span>
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-xs sm:text-sm font-semibold text-red-500 rounded-full border border-red-100 shadow-sm">
            {incorrectCount} Wrong
          </span>
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-xs sm:text-sm font-semibold text-gray-500 rounded-full border border-gray-200 shadow-sm">
            {unattemptedCount} Un-Attempted
          </span>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Questions & Answers</h2>

        {results.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-lg font-medium">No results data available.</p>
            <p className="text-gray-300 text-sm mt-1">Assessment data will appear here once available</p>
          </div>
        ) : (
          <div className="space-y-8">
            {results.map((q, idx) => {
              if (!q) return null;

              const isCorrect = q.is_correct;
              const score = q.score ?? 0;
              const maxScore = q.positive_marking ?? q.max_score ?? 1;
              const sectionName = q.section_name || q.question_type || q.type || 'TEXT';
              const isMCQ = sectionName.toUpperCase() === 'MCQ';

              
              const candidateAnswer = q.candidate_answer || q.given_answer || '';
              const correctAnswer = q.correct_answer || '';

              return (
                <div key={idx} className="space-y-4">
                  <div className="bg-pink-50 p-3 sm:p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-wrap">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <span className="font-bold px-3 py-1 bg-white rounded-lg text-sm sm:text-base text-pink-700 shadow-sm">Q {idx + 1}</span>
                        <span className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold border shadow-sm ${isCorrect ? 'bg-white text-green-600 border-green-100' : 'bg-white text-red-500 border-red-100'}`}>
                        {isCorrect ? 'Correct' : (!candidateAnswer ? 'Un-Attempted' : 'Incorrect')}
                        </span>
                    </div>
                    <div className="sm:ml-auto flex items-center self-end sm:self-auto w-full sm:w-auto justify-end">
                      <span className="bg-indigo-200 text-indigo-800 px-4 sm:px-5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide truncate max-w-[150px] sm:max-w-none shadow-sm">
                        {sectionName}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 pt-2">
                    <h3 className="text-base sm:text-lg font-semibold w-full sm:max-w-2xl break-words">Q. {q.question}</h3>
                    <span className="border-2 border-indigo-300 text-indigo-600 px-3 sm:px-4 py-0.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap self-start sm:self-auto shrink-0">
                      Marks: {score} / {maxScore}
                    </span>
                  </div>

                  {isMCQ ? (
                    <div className="space-y-3">
                      <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl border-2 gap-3 sm:gap-0 ${
                        isCorrect 
                          ? 'bg-green-50 border-green-200' 
                          : (!candidateAnswer ? 'bg-gray-50 border-gray-200' : 'bg-red-50 border-red-200')
                      }`}>
                        <div className="flex items-start sm:items-center gap-3">
                          {isCorrect 
                            ? <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" /> 
                            : (!candidateAnswer 
                                ? <AlertCircle size={20} className="text-gray-400 flex-shrink-0 mt-0.5 sm:mt-0" /> 
                                : <XCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                              )
                          }
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Your Answer</p>
                            <p className={`text-sm sm:text-base font-semibold break-words ${isCorrect ? 'text-green-700' : (!candidateAnswer ? 'text-gray-500 italic' : 'text-red-700')}`}>
                              {candidateAnswer || 'No answer provided'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {!isCorrect && correctAnswer && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl border-2 bg-green-50 border-green-200">
                          <div className="flex items-start sm:items-center gap-3">
                            <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Correct Answer</p>
                              <p className="text-sm font-semibold text-green-700">
                                {correctAnswer}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {q.feedback && (
                        <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Feedback</p>
                          <p className="text-sm text-blue-700">{q.feedback}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Candidate Answer */}
                      <div className={`p-4 border-2 rounded-xl text-sm leading-relaxed ${
                        isCorrect 
                          ? 'bg-green-50 border-green-200 text-green-800' 
                          : (!candidateAnswer ? 'bg-gray-50 border-gray-100 text-gray-400' : 'bg-red-50 border-red-100 text-red-800')
                      }`}>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Answer</p>
                        {sectionName.toUpperCase() === 'CODING' ? (
                          <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto font-mono text-xs sm:text-sm mt-2 shadow-inner">
                             <code>{candidateAnswer || '// No answer provided.'}</code>
                          </pre>
                        ) : (
                          <div className="font-medium">
                            {candidateAnswer || <span className="italic">No answer provided.</span>}
                          </div>
                        )}
                      </div>

                      {/* Expected Answer / Reference Solution */}
                      {correctAnswer && (
                        <div className="p-4 border-2 rounded-xl bg-indigo-50 border-indigo-100 text-indigo-900 text-sm leading-relaxed shadow-sm">
                          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">Expected Answer / Reference Solution</p>
                          {sectionName.toUpperCase() === 'CODING' ? (
                             <div className="space-y-4">
                               <pre className="bg-indigo-900/10 text-indigo-800 p-4 rounded-lg overflow-x-auto font-mono text-xs sm:text-sm border border-indigo-200">
                                 <code>{correctAnswer}</code>
                               </pre>
                               {(q.input_spec || q.output_spec || q.complexity_constraints) && (
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-indigo-100/50">
                                    {q.input_spec && (
                                      <div>
                                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Input Spec</p>
                                        <p className="text-xs">{q.input_spec}</p>
                                      </div>
                                    )}
                                    {q.output_spec && (
                                      <div>
                                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Output Spec</p>
                                        <p className="text-xs">{q.output_spec}</p>
                                      </div>
                                    )}
                                    {q.complexity_constraints && (
                                      <div className="sm:col-span-2">
                                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Complexity Constraints</p>
                                        <p className="text-xs font-mono">{q.complexity_constraints}</p>
                                      </div>
                                    )}
                                 </div>
                               )}
                             </div>
                          ) : (
                            <p className="font-semibold">{correctAnswer}</p>
                          )}
                        </div>
                      )}

                      {/* Rubric for Audio/Video */}
                      {q.rubric && (
                         <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 shadow-sm">
                            <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">Evaluation Rubric</p>
                            <p className="text-sm text-amber-900 leading-relaxed">{q.rubric}</p>
                            {q.expected_keywords && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {String(q.expected_keywords).split(',').map((kw, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] uppercase font-bold rounded">#{kw.trim()}</span>
                                ))}
                              </div>
                            )}
                         </div>
                      )}

                      {/* Explanation */}
                      {q.explanation && (
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 shadow-sm">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Explanation</p>
                          <p className="text-sm text-gray-700 leading-relaxed italic">{q.explanation}</p>
                        </div>
                      )}

                      {/* Feedback */}
                      {q.feedback && (
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 shadow-sm">
                          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Evaluation Feedback</p>
                          <p className="text-sm text-blue-800 leading-relaxed italic">{q.feedback}</p>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewInsightDetail;