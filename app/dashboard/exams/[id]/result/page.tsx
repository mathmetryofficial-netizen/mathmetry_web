'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, MinusCircle, Award } from 'lucide-react';

export default function ExamResultPage() {
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem('lastExamResult');
        if (stored) {
            try {
                setResult(JSON.parse(stored));
            } catch {
                setResult(null);
            }
        }
    }, []);

    if (!result) {
        return (
            <div className="py-20 text-center max-w-md mx-auto">
                <div className="p-8 bg-white rounded-2xl border border-[#EAE5E1]">
                    <h2 className="text-lg font-bold text-[#111111] mb-2">No Examination Record Found</h2>
                    <p className="text-xs text-[#626262] mb-6">
                        Results are stored per active assessment session. Please select an exam from your dashboard.
                    </p>
                    <Link
                        href="/dashboard/exams"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white hover:bg-[#F36A21] rounded-xl text-xs font-semibold transition"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Return to Assessments</span>
                    </Link>
                </div>
            </div>
        );
    }

    const percentage = Math.round((result.score / result.totalMarks) * 100);
    const correctCount = result.results?.filter((r: any) => r.isCorrect).length || 0;
    const wrongCount = result.results?.filter((r: any) => !r.isCorrect && r.selectedOption !== undefined).length || 0;
    const skippedCount = result.results?.filter((r: any) => r.selectedOption === undefined).length || 0;

    const accentColor = percentage >= 75 ? '#F36A21' : percentage >= 40 ? '#f59e0b' : '#ef4444';

    return (
        <div className="max-w-2xl mx-auto py-8 space-y-8">
            <div className="p-8 sm:p-10 bg-white rounded-2xl border border-[#EAE5E1] shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F36A21]">Assessment Completed</span>
                
                {/* Circular Score Gauge */}
                <div className="w-36 h-36 mx-auto rounded-full flex items-center justify-center bg-[#FFFCFB] my-6 relative border border-[#F0EBE7]">
                    <svg className="w-full h-full transform -rotate-90 p-2" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#F0EBE7" strokeWidth="8" />
                        <circle
                            cx="50"
                            cy="50"
                            r="42"
                            fill="none"
                            stroke={accentColor}
                            strokeWidth="8"
                            strokeDasharray={`${percentage * 2.64} 264`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-extrabold text-[#111111]">{percentage}%</span>
                        <span className="text-[11px] font-semibold text-[#858585] uppercase tracking-wider mt-0.5">Score</span>
                    </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-2 tracking-tight">
                    {percentage >= 75 ? 'Outstanding Performance!' : percentage >= 40 ? 'Good Effort, Keep Practicing!' : 'Needs Rigorous Revision'}
                </h1>
                
                <p className="text-sm text-[#626262] mb-8">
                    You secured <span className="font-bold text-[#111111]">{result.score}</span> out of{' '}
                    <span className="font-bold text-[#111111]">{result.totalMarks} marks</span>.
                </p>

                {/* Score Breakdown Cards */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 text-left">
                    <div className="p-4 bg-[#F9F5F1] rounded-xl border border-[#EAE5E1]">
                        <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Correct</span>
                        </div>
                        <div className="text-2xl font-extrabold text-[#111111]">{correctCount}</div>
                    </div>

                    <div className="p-4 bg-[#F9F5F1] rounded-xl border border-[#EAE5E1]">
                        <div className="flex items-center gap-1.5 text-rose-600 mb-1">
                            <XCircle className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Wrong</span>
                        </div>
                        <div className="text-2xl font-extrabold text-[#111111]">{wrongCount}</div>
                    </div>

                    <div className="p-4 bg-[#F9F5F1] rounded-xl border border-[#EAE5E1]">
                        <div className="flex items-center gap-1.5 text-[#858585] mb-1">
                            <MinusCircle className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Skipped</span>
                        </div>
                        <div className="text-2xl font-extrabold text-[#111111]">{skippedCount}</div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/dashboard/exams"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111111] text-white rounded-xl text-xs font-bold hover:bg-[#F36A21] transition shadow-sm"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Assessments</span>
                    </Link>

                    <Link
                        href="/dashboard/performance"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-[#111111] border border-[#EAE5E1] rounded-xl text-xs font-bold hover:bg-[#F9F5F1] transition"
                    >
                        <Award className="w-3.5 h-3.5 text-[#F36A21]" />
                        <span>View Analytics</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
