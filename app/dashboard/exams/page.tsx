'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Exam {
    _id: string;
    title: string;
    subject: string;
    durationMinutes: number;
    totalMarks: number;
    questions: any[];
}

export default function ExamsListPage() {
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/exams')
            .then((res) => res.json())
            .then((data) => {
                setExams(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading available exams...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Available Exams</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {exams.map((exam) => (
                    <div key={exam._id} className="flex flex-col p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-semibold dark:bg-indigo-900/50 dark:text-indigo-400 capitalize">
                                {exam.subject}
                            </span>
                            <span className="text-sm text-slate-500">{exam.durationMinutes} mins</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{exam.title}</h3>
                        <p className="text-sm text-slate-500 mb-6 dark:text-slate-400">{exam.questions.length} Questions • {exam.totalMarks} Marks</p>

                        <Link href={`/dashboard/exams/${exam._id}`} className="mt-auto w-full text-center bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition">
                            Start Exam
                        </Link>
                    </div>
                ))}

                {exams.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500">
                        No active exams available at the moment.
                    </div>
                )}
            </div>
        </div>
    );
}
