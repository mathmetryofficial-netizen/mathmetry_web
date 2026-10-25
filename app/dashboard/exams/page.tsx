'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, HelpCircle, Award, ArrowRight, BookOpen } from 'lucide-react';

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
                setExams(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setExams([]);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="py-20 text-center">
                <div className="w-8 h-8 border-2 border-[#F36A21] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-[#626262]">Loading examination roster...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="border-b border-[#EAE5E1] pb-6">
                <span className="text-xs uppercase tracking-wider font-bold text-[#F36A21]">Standardized Assessments</span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight mt-1">Available Mock Exams</h1>
                <p className="text-sm text-[#626262] mt-1 max-w-xl">
                    Timed chapter-wise and full-syllabus mock tests strictly aligned to Foundation, ICSE, and CBSE marking schemes.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {exams.map((exam) => (
                    <div
                        key={exam._id}
                        className="flex flex-col bg-white border border-[#EAE5E1] rounded-2xl p-6 hover:border-[#F36A21]/40 hover:shadow-[0_8px_24px_rgba(243,106,33,0.06)] transition-all duration-200"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-[#FFF4EC] text-[#F36A21] text-xs px-2.5 py-1 rounded-full font-bold capitalize border border-[#F36A21]/20">
                                {exam.subject || 'Mathematics'}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#626262]">
                                <Clock className="w-3.5 h-3.5 text-[#858585]" />
                                <span>{exam.durationMinutes} mins</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-[#111111] mb-2 leading-snug">{exam.title}</h3>

                        <div className="flex items-center gap-3 text-xs text-[#626262] mb-6">
                            <span className="flex items-center gap-1">
                                <HelpCircle className="w-3.5 h-3.5 text-[#858585]" />
                                {exam.questions?.length || 0} Questions
                            </span>
                            <span className="w-1 h-1 rounded-full bg-[#EAE5E1]" />
                            <span className="flex items-center gap-1">
                                <Award className="w-3.5 h-3.5 text-[#858585]" />
                                {exam.totalMarks} Marks
                            </span>
                        </div>

                        <Link
                            href={`/dashboard/exams/${exam._id}`}
                            className="mt-auto w-full inline-flex items-center justify-center gap-2 text-center bg-[#111111] text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-[#F36A21] transition shadow-sm"
                        >
                            <span>Start Assessment</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ))}

                {exams.length === 0 && (
                    <div className="col-span-full py-16 text-center bg-white border border-[#EAE5E1] rounded-2xl p-8">
                        <div className="w-12 h-12 rounded-full bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-[#111111]">No Scheduled Exams Found</h3>
                        <p className="text-xs text-[#626262] max-w-md mx-auto mt-1 mb-5">
                            New timed chapter examinations are published periodically by Mathmetry instructors. Please check your assigned curriculum materials in the meantime.
                        </p>
                        <Link
                            href="/dashboard/materials"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-[#F36A21] hover:underline"
                        >
                            <span>View Study Materials</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
