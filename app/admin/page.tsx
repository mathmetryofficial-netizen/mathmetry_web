'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, FileText, ClipboardList, DollarSign } from 'lucide-react';
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
            <div className="flex flex-col items-center justify-center min-h-96">
                <Loader size="lg" />
                <p className="mt-4 text-slate-600">Loading dashboard...</p>
            </div>
        );
    }

    const statCards = [
        { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
        { title: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', textColor: 'text-green-600' },
        { title: 'Materials', value: stats.totalMaterials, icon: FileText, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
        { title: 'Exams', value: stats.totalExams, icon: ClipboardList, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-600 mt-1">Welcome back! Here's your platform overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                                </div>
                                <TrendingUp className="w-4 h-4 text-green-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                            <p className="text-sm text-slate-600">{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-2xl border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">Recent Registrations</h3>
                    <p className="text-slate-600 text-sm mt-1">Latest users who joined the platform</p>
                </div>
                <div className="p-6">
                    {stats.recentUsers.length > 0 ? (
                        <div className="space-y-3">
                            {stats.recentUsers.map((user) => (
                                <div key={user.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                            <span className="text-white font-bold text-lg">{user.name.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{user.name}</p>
                                            <p className="text-slate-500 text-sm">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-slate-900">
                                            {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(user.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500">No recent registrations</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}