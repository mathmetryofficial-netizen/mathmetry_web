'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, CheckCircle2, ChevronLeft, ChevronRight, Send, AlertTriangle } from 'lucide-react';

interface Question {
    _id: string;
    text: string;
    options: string[];
    marks: number;
}

interface Exam {
    _id: string;
    title: string;
    durationMinutes: number;
    questions: Question[];
}

export default function TakeExamPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
    const [exam, setExam] = useState<Exam | null>(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);

    const router = useRouter();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        Promise.resolve(params).then((p) => setUnwrappedParams(p));
    }, [params]);

    useEffect(() => {
        if (!unwrappedParams?.id) return;

        fetch(`/api/exams/${unwrappedParams.id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Exam not found');
                return res.json();
            })
            .then((data) => {
                setExam(data);
                setTimeLeft(data.durationMinutes * 60);
                setLoading(false);
            })
            .catch((err) => {
                alert(err.message);
                router.push('/dashboard/exams');
            });
    }, [unwrappedParams, router]);

    const handleSubmit = async () => {
        if (!exam || !unwrappedParams) return;

        if (timerRef.current) clearTimeout(timerRef.current);

        setLoading(true);
        try {
            const res = await fetch(`/api/exams/${unwrappedParams.id}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers })
            });

            const result = await res.json();
            localStorage.setItem('lastExamResult', JSON.stringify(result));
            router.push(`/dashboard/exams/${unwrappedParams.id}/result`);
        } catch (error) {
            console.error(error);
            alert('Submission failed');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (timeLeft > 0 && !loading) {
            timerRef.current = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0 && !loading && exam) {
            handleSubmit();
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [timeLeft, loading, exam]);

    const handleOptionSelect = (questionId: string, optionIndex: number) => {
        setAnswers({ ...answers, [questionId]: optionIndex });
    };

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    if (loading || !exam) {
        return (
            <div className="py-24 text-center">
                <div className="w-9 h-9 border-2 border-[#F36A21] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#111111]">Loading Examination Environment...</p>
                <p className="text-xs text-[#626262] mt-1">Please do not refresh or navigate away.</p>
            </div>
        );
    }

    const currentQ = exam.questions[currentQuestionIndex];
    const isUrgent = timeLeft < 300;

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Top Exam Header with Real-Time Clock */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border border-[#EAE5E1] rounded-2xl p-3 sm:p-4 lg:p-5 mb-6 sm:mb-8 flex justify-between items-center shadow-sm gap-2">
                <div className="min-w-0 pr-2">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#F36A21]">Live Examination</span>
                    <h1 className="text-sm sm:text-base md:text-lg font-bold text-[#111111] truncate mt-0.5">
                        {exam.title}
                    </h1>
                </div>

                <div
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono font-bold text-sm sm:text-base shrink-0 transition-colors ${
                        isUrgent
                            ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse'
                            : 'bg-[#FFF4EC] text-[#F36A21] border border-[#F36A21]/20'
                    }`}
                >
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>{formatTime(timeLeft)}</span>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Question Surface */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5E1] shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[420px] flex flex-col">
                        <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#F0EBE7]">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#F36A21]">
                                Question {currentQuestionIndex + 1} of {exam.questions.length}
                            </span>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F9F5F1] text-[#626262] border border-[#EAE5E1]">
                                {currentQ.marks} {currentQ.marks === 1 ? 'Mark' : 'Marks'}
                            </span>
                        </div>

                        <p className="text-base sm:text-lg font-semibold text-[#111111] mb-8 leading-relaxed">
                            {currentQ.text}
                        </p>

                        <div className="space-y-3 mt-auto">
                            {currentQ.options.map((option, idx) => {
                                const isSelected = answers[currentQ._id] === idx;
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleOptionSelect(currentQ._id, idx)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                                            isSelected
                                                ? 'border-[#F36A21] bg-[#FFF4EC]/60 ring-1 ring-[#F36A21] text-[#111111]'
                                                : 'border-[#EAE5E1] hover:border-[#F36A21]/30 hover:bg-[#F9F5F1] text-[#111111]'
                                        }`}
                                    >
                                        <span
                                            className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                                                isSelected
                                                    ? 'bg-[#F36A21] text-white'
                                                    : 'bg-[#F9F5F1] text-[#626262] border border-[#EAE5E1]'
                                            }`}
                                        >
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        <span className="text-sm font-medium leading-relaxed pt-0.5">{option}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center gap-3">
                        <button
                            type="button"
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                            className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl border border-[#EAE5E1] font-semibold text-xs text-[#111111] hover:bg-[#F9F5F1] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Previous</span>
                        </button>

                        {currentQuestionIndex === exam.questions.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 bg-[#F36A21] text-white rounded-xl font-bold text-xs hover:bg-[#DE5815] shadow-sm transition cursor-pointer"
                            >
                                <span>Submit Assessment</span>
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-5 sm:px-6 py-2.5 bg-[#111111] text-white rounded-xl font-semibold text-xs hover:bg-[#F36A21] shadow-sm transition cursor-pointer"
                            >
                                <span>Next Question</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Question Palette Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE5E1] shadow-sm sticky top-24">
                        <h3 className="font-bold text-sm text-[#111111] mb-1">Question Palette</h3>
                        <p className="text-xs text-[#626262] mb-5">Click any number to jump directly</p>

                        <div className="grid grid-cols-5 gap-2">
                            {exam.questions.map((q, idx) => {
                                const isCurrent = currentQuestionIndex === idx;
                                const isAnswered = answers[q._id] !== undefined;

                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setCurrentQuestionIndex(idx)}
                                        className={`aspect-square min-h-[40px] sm:min-h-[44px] rounded-xl flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                                            isCurrent ? 'ring-2 ring-[#F36A21] ring-offset-2' : ''
                                        } ${
                                            isAnswered
                                                ? 'bg-[#FFF4EC] text-[#F36A21] border border-[#F36A21]/30 font-extrabold'
                                                : 'bg-[#F9F5F1] text-[#626262] hover:bg-[#EAE5E1]'
                                        }`}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-5 border-t border-[#F0EBE7] space-y-2 text-xs text-[#626262]">
                            <div className="flex items-center gap-2">
                                <span className="w-3.5 h-3.5 rounded bg-[#FFF4EC] border border-[#F36A21]/30 inline-block" />
                                <span>Answered ({Object.keys(answers).length})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3.5 h-3.5 rounded bg-[#F9F5F1] inline-block" />
                                <span>Unanswered ({exam.questions.length - Object.keys(answers).length})</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-5 border-t border-[#F0EBE7]">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full py-2.5 px-4 bg-[#111111] text-white hover:bg-[#F36A21] rounded-xl text-xs font-bold transition"
                            >
                                Finalize & Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
