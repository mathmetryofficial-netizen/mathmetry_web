'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

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

export default function TakeExamPage({ params }: { params: { id: string } }) {
    // Unwrap params using React.use() if needed in v15+, but in standard app router params is a promise in recent versions.
    // The user environment is Next.js 16.1.4 as seen in package.json earlier.
    // params is a Promise in Next.js 15+. I need to await it or use `use` hook.
    // Since this is a client component, I can use `use` from React or just await inside useEffect if I didn't need it immediately, but standard way now is: 
    // `const { id } = React.use(params);` if I pass it as prop, but `page.tsx` props are async.
    // Actually, easiest way is to treat `params` as a Promise.

    const [exam, setExam] = useState<Exam | null>(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);

    const router = useRouter();
    const timerRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        // Unwrap params
        Promise.resolve(params).then(p => setUnwrappedParams(p));
    }, [params]);

    useEffect(() => {
        if (!unwrappedParams) return;

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

    useEffect(() => {
        if (timeLeft > 0 && !loading) {
            timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0 && !loading && exam) {
            handleSubmit();
        }
        return () => clearTimeout(timerRef.current!);
    }, [timeLeft, loading, exam]);

    const handleOptionSelect = (questionId: string, optionIndex: number) => {
        setAnswers({ ...answers, [questionId]: optionIndex });
    };

    const handleSubmit = async () => {
        if (!exam || !unwrappedParams) return;

        // Clear timer
        if (timerRef.current) clearTimeout(timerRef.current);

        setLoading(true);
        try {
            const res = await fetch(`/api/exams/${unwrappedParams.id}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers })
            });

            const result = await res.json();
            // Store result in local storage or state management to show in the next page
            localStorage.setItem('lastExamResult', JSON.stringify(result));
            router.push(`/dashboard/exams/${unwrappedParams.id}/result`); // I need to create this page
        } catch (error) {
            console.error(error);
            alert('Submission failed');
            setLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    if (loading || !exam) return <div className="p-10 text-center">Loading Exam...</div>;

    const currentQ = exam.questions[currentQuestionIndex];

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header with Timer */}
            <div className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 -mx-4 lg:-mx-10 mb-6 flex justify-between items-center shadow-sm">
                <h1 className="text-xl font-bold truncate pr-4">{exam.title}</h1>
                <div className={`px-4 py-2 rounded-lg font-mono font-bold text-lg ${timeLeft < 300 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'}`}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Question Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700 min-h-[400px]">
                        <div className="flex justify-between mb-4">
                            <span className="text-sm font-semibold text-slate-500">Question {currentQuestionIndex + 1} of {exam.questions.length}</span>
                            <span className="text-sm font-semibold text-slate-500">{currentQ.marks} Marks</span>
                        </div>

                        <p className="text-lg font-medium mb-8">{currentQ.text}</p>

                        <div className="space-y-3">
                            {currentQ.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionSelect(currentQ._id, idx)}
                                    className={`w-full text-left p-4 rounded-lg border transition-all ${answers[currentQ._id] === idx
                                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                            : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-slate-300 mr-3 text-sm font-medium dark:border-slate-500">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                            className="px-6 py-2 rounded-lg border border-slate-300 font-medium hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:hover:bg-slate-800"
                        >
                            Previous
                        </button>

                        {currentQuestionIndex === exam.questions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 shadow-md transition"
                            >
                                Submit Exam
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
                            >
                                Next Question
                            </button>
                        )}
                    </div>
                </div>

                {/* Navigation Panel */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24 dark:bg-slate-800 dark:border-slate-700">
                        <h3 className="font-bold mb-4">Question Palette</h3>
                        <div className="grid grid-cols-5 gap-2">
                            {exam.questions.map((q, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentQuestionIndex(idx)}
                                    className={`aspect-square rounded-md flex items-center justify-center text-sm font-medium transition-colors ${currentQuestionIndex === idx ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-800' : ''
                                        } ${answers[q._id] !== undefined
                                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                                        }`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-sm text-slate-600 dark:text-slate-400">
                                <div className="w-3 h-3 bg-indigo-100 rounded-sm"></div> Answered
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <div className="w-3 h-3 bg-slate-100 rounded-sm"></div> Not Answered
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
