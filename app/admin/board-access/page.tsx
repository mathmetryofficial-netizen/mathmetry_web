'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Users, TrendingUp } from 'lucide-react';
import Loader from '@/components/Loader';

interface BoardAccessRecord {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
        mobile: string;
    };
    classLevel: string;
    board: string;
    amount: number;
    paymentId: string;
    orderId: string;
    status: string;
    purchasedAt: string;
}

export default function BoardAccessPage() {
    const [boardAccess, setBoardAccess] = useState<BoardAccessRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, revenue: 0, active: 0 });

    useEffect(() => {
        fetchBoardAccess();
    }, []);

    const fetchBoardAccess = async () => {
        try {
            const response = await fetch('/api/admin/board-access');
            if (response.ok) {
                const data = await response.json();
                setBoardAccess(data.boardAccess || []);
                
                const total = data.boardAccess?.length || 0;
                const revenue = data.boardAccess?.reduce((sum: number, item: BoardAccessRecord) => sum + item.amount, 0) || 0;
                const active = data.boardAccess?.filter((item: BoardAccessRecord) => item.status === 'active').length || 0;
                
                setStats({ total, revenue, active });
            }
        } catch (error) {
            console.error('Failed to fetch board access:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader size="md" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F36A21] bg-[#FFF4EC] border border-[#F36A21]/20 px-3 py-1 rounded-full inline-block mb-2">
                    Access Ledger
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">Board Access Management</h1>
                <div className="w-10 h-1 bg-[#F36A21] rounded-full mt-2 mb-2" />
                <p className="text-xs sm:text-sm text-[#626262]">Audit verified student purchases, active entitlements, and transaction details.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <div className="bg-white rounded-2xl p-6 border border-[#EAE5E1] shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#858585]">Total Purchases</span>
                        <div className="w-9 h-9 rounded-lg bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-[#F36A21]" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-[#111111]">{stats.total}</p>
                    <p className="text-xs text-[#858585] mt-1">Passes issued</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[#EAE5E1] shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#858585]">Total Revenue</span>
                        <div className="w-9 h-9 rounded-lg bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-[#F36A21]" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-[#111111]">₹{stats.revenue.toLocaleString()}</p>
                    <p className="text-xs text-[#858585] mt-1">From board purchases</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[#EAE5E1] shadow-xs sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#858585]">Active Passes</span>
                        <div className="w-9 h-9 rounded-lg bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center">
                            <Users className="w-4 h-4 text-[#F36A21]" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-[#111111]">{stats.active}</p>
                    <p className="text-xs text-[#858585] mt-1">Active student entitlements</p>
                </div>
            </div>

            {/* Board Access Table with Mobile Responsive Scrolling */}
            <div className="bg-white rounded-2xl shadow-xs border border-[#EAE5E1] overflow-hidden">
                <div className="px-6 py-4 bg-[#F9F5F1] border-b border-[#EAE5E1] flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#111111]">Recent Entitlement Transactions</h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-[#626262] border border-[#EAE5E1]">
                        {boardAccess.length} Records
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FFFCFB] border-b border-[#EAE5E1] text-[11px] font-bold text-[#858585] uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-3.5 whitespace-nowrap">User</th>
                                <th className="px-6 py-3.5 whitespace-nowrap">Class</th>
                                <th className="px-6 py-3.5 whitespace-nowrap">Board</th>
                                <th className="px-6 py-3.5 whitespace-nowrap">Amount</th>
                                <th className="px-6 py-3.5 whitespace-nowrap">Payment ID</th>
                                <th className="px-6 py-3.5 whitespace-nowrap">Status</th>
                                <th className="px-6 py-3.5 whitespace-nowrap">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0EBE7] text-xs">
                            {boardAccess.map((record) => (
                                <tr key={record._id} className="hover:bg-[#F9F5F1]/60 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="font-semibold text-[#111111]">{record.userId?.name || 'Student'}</div>
                                            <div className="text-[11px] text-[#858585]">{record.userId?.email}</div>
                                            {record.userId?.mobile && (
                                                <div className="text-[11px] text-[#858585]">{record.userId.mobile}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#111111] font-medium whitespace-nowrap">Class {record.classLevel}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2.5 py-1 bg-[#FFF4EC] text-[#F36A21] border border-[#F36A21]/20 rounded-full text-[11px] font-bold">
                                            {record.board}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-[#111111] whitespace-nowrap">₹{record.amount}</td>
                                    <td className="px-6 py-4 text-[11px] text-[#626262] font-mono whitespace-nowrap">{record.paymentId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                            record.status === 'active' 
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                                : 'bg-[#F9F5F1] text-[#626262] border-[#EAE5E1]'
                                        }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[11px] text-[#858585] whitespace-nowrap">
                                        {new Date(record.purchasedAt).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {boardAccess.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xs text-[#858585]">No board access purchases logged yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
