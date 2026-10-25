'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ClipboardList, GraduationCap, Award, ArrowRight, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Loader from '@/components/Loader';

interface DashboardData {
    materialsCount: number;
    examsCount: number;
    coursesCount: number;
    recentMaterials: Array<{
        _id: string;
        title: string;
        subject: string;
        createdAt: string;
        fileUrl: string;
    }>;
    recentExams: Array<{
        _id: string;
        title: string;
        subject: string;
        totalMarks: number;
    }>;
}

export default function DashboardPage() {
    const { data: session } = useSession();
    const isAdmin = session?.user?.role === 'admin';
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        materialsCount: 0,
        examsCount: 0,
        coursesCount: 0,
        recentMaterials: [],
        recentExams: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('/api/dashboard/stats');
            if (response.ok) {
                const data = await response.json();
                setDashboardData(data);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
                <Loader size="md" />
                <p className="text-xs font-semibold text-[#858585]">Loading student dashboard...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5E1] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F36A21] bg-[#FFF4EC] border border-[#F36A21]/20 px-3 py-1 rounded-full inline-block mb-2">
                        Student Overview
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                        Welcome, {session?.user?.name || 'Student'}
                    </h1>
                    <div className="w-10 h-1 bg-[#F36A21] rounded-full mt-2 mb-2" />
                    <p className="text-sm text-[#626262]">
                        Review your learning resources, accessed chapters, and upcoming board examinations.
                    </p>
                </div>
                {isAdmin && (
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#F36A21] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 shadow-xs"
                    >
                        <ShieldCheck size={16} />
                        <span>Admin Console</span>
                    </Link>
                )}
            </div>

            {/* Stats Cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Study Materials", value: dashboardData.materialsCount, icon: BookOpen, sub: "Chapter notes available" },
                    { label: "Online Exams", value: dashboardData.examsCount, icon: ClipboardList, sub: "Practice assessments" },
                    { label: "Video Courses", value: dashboardData.coursesCount, icon: GraduationCap, sub: "Conceptual modules" },
                    { label: "Active Unlocks", value: dashboardData.recentMaterials.length, icon: Award, sub: "Purchased board files" },
                ].map((stat, idx) => {
                    const IconComp = stat.icon;
                    return (
                        <div key={idx} className="bg-white rounded-2xl p-6 border border-[#EAE5E1] shadow-xs">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-[#626262] uppercase tracking-wider">{stat.label}</span>
                                <div className="w-9 h-9 rounded-lg bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center">
                                    <IconComp size={18} />
                                </div>
                            </div>
                            <div className="text-3xl font-black text-[#111111] mb-1">{stat.value}</div>
                            <p className="text-xs text-[#858585]">{stat.sub}</p>
                        </div>
                    );
                })}
            </div>

            {/* Content Lists */}
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Active Materials */}
                <div className="bg-white rounded-3xl border border-[#EAE5E1] shadow-xs overflow-hidden">
                    <div className="p-6 border-b border-[#EAE5E1] flex items-center justify-between bg-[#F9F5F1]">
                        <div>
                            <h3 className="text-base font-bold text-[#111111]">Active Board Materials</h3>
                            <p className="text-xs text-[#858585]">Materials unlocked under your purchased boards</p>
                        </div>
                        <Link href="/materials" className="text-xs font-bold text-[#F36A21] hover:underline">
                            Browse All →
                        </Link>
                    </div>

                    <div className="p-6">
                        {dashboardData.recentMaterials.length > 0 ? (
                            <div className="space-y-3">
                                {dashboardData.recentMaterials.map((material) => (
                                    <div
                                        key={material._id}
                                        className="flex items-center justify-between p-4 rounded-xl border border-[#EAE5E1] hover:bg-[#FFFCFB] transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center shrink-0">
                                                <BookOpen size={16} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-[#111111]">{material.title}</p>
                                                <p className="text-[11px] text-[#858585]">{material.subject}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/materials/view/${material._id}`}
                                            className="px-3.5 py-1.5 bg-[#111111] hover:bg-[#F36A21] text-white rounded-full text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                                        >
                                            <Eye size={12} />
                                            <span>Open</span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-xs text-[#858585] mb-4">No active board access found yet.</p>
                                <Link
                                    href="/materials"
                                    className="px-5 py-2.5 bg-[#F36A21] hover:bg-[#DE5815] text-white rounded-full text-xs font-bold shadow-xs transition-colors"
                                >
                                    Unlock Your Board — ₹999
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Available Exams */}
                <div className="bg-white rounded-3xl border border-[#EAE5E1] shadow-xs overflow-hidden">
                    <div className="p-6 border-b border-[#EAE5E1] flex items-center justify-between bg-[#F9F5F1]">
                        <div>
                            <h3 className="text-base font-bold text-[#111111]">Practice Mock Exams</h3>
                            <p className="text-xs text-[#858585]">Timed assessments to test real board readiness</p>
                        </div>
                        <Link href="/dashboard/exams" className="text-xs font-bold text-[#F36A21] hover:underline">
                            View Exams →
                        </Link>
                    </div>

                    <div className="p-6">
                        {dashboardData.recentExams.length > 0 ? (
                            <div className="space-y-3">
                                {dashboardData.recentExams.map((exam) => (
                                    <div
                                        key={exam._id}
                                        className="flex items-center justify-between p-4 rounded-xl border border-[#EAE5E1] hover:bg-[#FFFCFB] transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-[#F9F5F1] text-[#111111] flex items-center justify-center shrink-0">
                                                <ClipboardList size={16} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-[#111111]">{exam.title}</p>
                                                <p className="text-[11px] text-[#858585]">{exam.subject} • {exam.totalMarks} Total Marks</p>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/dashboard/exams/${exam._id}`}
                                            className="px-3.5 py-1.5 bg-[#F9F5F1] hover:bg-[#111111] text-[#111111] hover:text-white rounded-full text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                                        >
                                            <span>Start Test</span>
                                            <ArrowRight size={12} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-xs text-[#858585]">New board mock papers are being scheduled.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
