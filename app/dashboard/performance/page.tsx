'use client';

import { Award, Clock, FileCheck, TrendingUp } from 'lucide-react';

export default function PerformancePage() {
    // In production, records come from API. Preserving structure with editorial treatment.
    const performanceData = {
        totalExams: 5,
        averageScore: 78,
        timeSpent: '12h 30m',
        history: [
            { id: 1, title: 'Algebra & Linear Equations', date: 'Oct 12, 2025', score: 85, total: 100 },
            { id: 2, title: 'Coordinate Geometry & Straight Lines', date: 'Oct 15, 2025', score: 60, total: 100 },
            { id: 3, title: 'Trigonometric Identities & Ratios', date: 'Oct 18, 2025', score: 92, total: 100 },
            { id: 4, title: 'Circles, Chords & Tangents', date: 'Oct 20, 2025', score: 75, total: 100 },
            { id: 5, title: 'Probability & Statistics Fundamentals', date: 'Oct 25, 2025', score: 80, total: 100 },
        ]
    };

    return (
        <div className="space-y-8">
            <div className="border-b border-[#EAE5E1] pb-6">
                <span className="text-xs uppercase tracking-wider font-bold text-[#F36A21]">Academic Records</span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight mt-1">
                    Performance Analytics
                </h1>
                <p className="text-sm text-[#626262] mt-1 max-w-xl">
                    Historical metrics tracking your test frequency, mastery index, and concept retention over time.
                </p>
            </div>

            {/* 3 Metrics Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white p-6 rounded-2xl border border-[#EAE5E1] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#626262]">Average Accuracy</span>
                        <div className="w-8 h-8 rounded-lg bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-[#111111]">{performanceData.averageScore}%</div>
                    <p className="text-xs text-[#858585] mt-1">Across all completed assessments</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#EAE5E1] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#626262]">Exams Completed</span>
                        <div className="w-8 h-8 rounded-lg bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center">
                            <FileCheck className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-[#111111]">{performanceData.totalExams}</div>
                    <p className="text-xs text-[#858585] mt-1">Evaluated by automated grading engine</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#EAE5E1] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#626262]">Total Practice Time</span>
                        <div className="w-8 h-8 rounded-lg bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center">
                            <Clock className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-[#111111]">{performanceData.timeSpent}</div>
                    <p className="text-xs text-[#858585] mt-1">Logged in timed examination mode</p>
                </div>
            </div>

            {/* Exam History Table */}
            <div className="bg-white rounded-2xl border border-[#EAE5E1] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#EAE5E1] bg-[#F9F5F1] flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-sm text-[#111111]">Assessment History</h2>
                        <p className="text-xs text-[#626262]">Chronological list of all attempted question sets</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-[#626262] border border-[#EAE5E1]">
                        {performanceData.history.length} Sessions
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#FFFCFB] text-[#858585] text-[11px] uppercase tracking-wider font-bold border-b border-[#EAE5E1]">
                            <tr>
                                <th className="px-6 py-3.5">Topic / Exam Name</th>
                                <th className="px-6 py-3.5">Date Attempted</th>
                                <th className="px-6 py-3.5">Raw Score</th>
                                <th className="px-6 py-3.5 text-right">Result</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0EBE7]">
                            {performanceData.history.map((item) => (
                                <tr key={item.id} className="hover:bg-[#F9F5F1]/70 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-[#111111]">{item.title}</td>
                                    <td className="px-6 py-4 text-xs text-[#626262]">{item.date}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-[#111111]">{item.score}</span>
                                        <span className="text-xs text-[#858585]"> / {item.total}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 text-[11px] rounded-full font-bold uppercase tracking-wider border ${
                                                item.score >= 40
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                            }`}
                                        >
                                            {item.score >= 40 ? 'Qualified' : 'Review Needed'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
