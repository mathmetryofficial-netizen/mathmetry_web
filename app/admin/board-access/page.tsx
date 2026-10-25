'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Users, TrendingUp } from 'lucide-react';

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
                setBoardAccess(data.boardAccess);
                
                const total = data.boardAccess.length;
                const revenue = data.boardAccess.reduce((sum: number, item: BoardAccessRecord) => sum + item.amount, 0);
                const active = data.boardAccess.filter((item: BoardAccessRecord) => item.status === 'active').length;
                
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
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Board Access Management</h1>
                <p className="text-gray-600 mt-2">View and manage board access purchases</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Purchases</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                            <p className="text-3xl font-bold text-gray-900">₹{stats.revenue}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Active Access</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Board Access Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Class</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Board</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Payment ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {boardAccess.map((record) => (
                                <tr key={record._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-gray-900">{record.userId.name}</div>
                                            <div className="text-sm text-gray-500">{record.userId.email}</div>
                                            <div className="text-sm text-gray-500">{record.userId.mobile}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">Class {record.classLevel}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                            {record.board}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">₹{record.amount}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{record.paymentId}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            record.status === 'active' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-gray-100 text-gray-700'
                                        }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
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
                        <p className="text-gray-500">No board access purchases yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
