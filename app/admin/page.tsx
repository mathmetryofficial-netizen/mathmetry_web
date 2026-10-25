'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, FileText, ClipboardList, IndianRupee, ShieldCheck } from 'lucide-react';
import Loader from '@/components/Loader';

interface Stats {
    totalUsers: number;
    totalRevenue: number;
    totalMaterials: number;
    totalExams: number;
    recentUsers: Array<{
        id: string;
        name: string;
        email: string;
        createdAt: string;
    }>;
}

export default function AdminPage() {
    const [stats, setStats] = useState<Stats>({
        totalUsers: 0,
        totalRevenue: 0,
        totalMaterials: 0,
        totalExams: 0,
        recentUsers: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-96 gap-3">
                <Loader size="md" />
                <p className="text-xs font-semibold text-[#858585]">Loading administrator overview...</p>
            </div>
        );
    }

    const statCards = [
        { title: 'Registered Students', value: stats.totalUsers, icon: Users, sub: 'Total active accounts' },
        { title: 'Gross Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: IndianRupee, sub: 'Verified board passes' },
        { title: 'Study Materials', value: stats.totalMaterials, icon: FileText, sub: 'Uploaded chapter resources' },
        { title: 'Mock Exams', value: stats.totalExams, icon: ClipboardList, sub: 'Configured assessments' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F36A21] bg-[#FFF4EC] border border-[#F36A21]/20 px-3 py-1 rounded-full inline-block mb-2">
                    System Overview
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">Admin Console</h1>
                <div className="w-10 h-1 bg-[#F36A21] rounded-full mt-2 mb-2" />
                <p className="text-xs sm:text-sm text-[#626262]">Real-time operational metrics, student registrations, and curriculum statistics.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-2xl p-6 border border-[#EAE5E1] shadow-xs">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#858585]">{stat.title}</span>
                                <div className="w-9 h-9 rounded-lg bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center">
                                    <Icon size={18} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-black text-[#111111] mb-1">{stat.value}</h3>
                            <p className="text-xs text-[#858585]">{stat.sub}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Registrations Table/Card */}
            <div className="bg-white rounded-3xl border border-[#EAE5E1] shadow-xs overflow-hidden">
                <div className="p-6 border-b border-[#EAE5E1] bg-[#F9F5F1]">
                    <h3 className="text-base font-bold text-[#111111]">Recent Student Registrations</h3>
                    <p className="text-xs text-[#858585] mt-0.5">Latest students onboarded across all boards</p>
                </div>
                <div className="p-6">
                    {stats.recentUsers.length > 0 ? (
                        <div className="divide-y divide-[#F0EBE7]">
                            {stats.recentUsers.map((user) => (
                                <div key={user.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3.5">
                                        <div className="h-10 w-10 rounded-full bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center font-bold text-xs uppercase shrink-0">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#111111]">{user.name}</p>
                                            <p className="text-[11px] text-[#858585]">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold text-[#111111]">
                                            {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        <p className="text-[10px] text-[#858585]">
                                            {new Date(user.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-[#EAE5E1] mx-auto mb-3" />
                            <p className="text-xs text-[#858585]">No recent registrations recorded</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}