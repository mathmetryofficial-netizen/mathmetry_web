'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ExamResultPage() {
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem('lastExamResult');
        if (stored) {
            setResult(JSON.parse(stored));
        }
    }, []);

    if (!result) return <div className="p-10 text-center">No result found.</div>;

    const percentage = Math.round((result.score / result.totalMarks) * 100);

    return (
        <div className="max-w-2xl mx-auto py-10 text-center space-y-8">
            <div className="p-8 bg-white rounded-2xl shadow-lg border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 mb-6 relative">
                    <svg className="w-full h-full text-slate-200 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
                        <circle
                            cx="50" cy="50" r="45" fill="none" stroke={percentage >= 70 ? '#22c55e' : percentage >= 40 ? '#eab308' : '#ef4444'} strokeWidth="8"
                            strokeDasharray={`${percentage * 2.83} 283`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{percentage}%</span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-2">
                    {percentage >= 70 ? 'Excellent Job!' : percentage >= 40 ? 'Good Effort!' : 'Keep Practicing'}
                </h1>
                <p className="text-slate-500 mb-8 dark:text-slate-400">
                    You scored <span className="font-bold text-primary">{result.score}</span> out of <span className="font-bold">{result.totalMarks}</span>
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-slate-50 rounded-xl dark:bg-slate-700/50">
                        <div className="text-2xl font-bold text-green-600">{result.results.filter((r: any) => r.isCorrect).length}</div>
                        <div className="text-xs font-semibold text-slate-500 uppercase">Correct</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl dark:bg-slate-700/50">
                        <div className="text-2xl font-bold text-red-500">{result.results.filter((r: any) => !r.isCorrect && r.selectedOption !== undefined).length}</div>
                        <div className="text-xs font-semibold text-slate-500 uppercase">Wrong</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl dark:bg-slate-700/50">
                        <div className="text-2xl font-bold text-slate-500">{result.results.filter((r: any) => r.selectedOption === undefined).length}</div>
                        <div className="text-xs font-semibold text-slate-500 uppercase">Skipped</div>
                    </div>
                </div>

                <Link href="/dashboard/exams" className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition shadow-md">
                    Back to Exams
                </Link>
            </div>
        </div>
    );
}
