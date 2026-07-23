import React, { useState } from 'react';
import { FileText, Search, BookOpen } from 'lucide-react';
import Latex from './Latex';

export default function PastQuestions() {
  const [searchQuery, setSearchQuery] = useState('');

  // Placeholder for the questions you will provide
  const questions: any[] = [];

  const filteredQuestions = questions.filter(q => 
    q.questionText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.year?.toString().includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search past questions, years, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-1 rounded-md">
                  {q.year}
                </span>
                {q.topic && (
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    {q.topic}
                  </span>
                )}
              </div>
              <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                <Latex text={q.questionText} />
              </div>
              {q.solution && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">Solution:</h4>
                  <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <Latex text={q.solution} />
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No questions available yet</p>
            <p className="text-xs text-slate-400 mt-1">Please provide the past questions to populate this section.</p>
          </div>
        )}
      </div>
    </div>
  );
}
