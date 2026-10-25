'use client';

import { useState, useEffect } from 'react';
import Loader from '@/components/Loader';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data.users || []);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateUserRole = async (userId: string, newRole: string) => {
        try {
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            });

            if (response.ok) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Failed to update user role:', error);
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
                    User Accounts
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">Manage Users</h1>
                <div className="w-10 h-1 bg-[#F36A21] rounded-full mt-2 mb-2" />
                <p className="text-xs sm:text-sm text-[#626262]">Audit student registrations and manage administrative role permissions.</p>
            </div>

            <div className="bg-white rounded-2xl border border-[#EAE5E1] shadow-xs overflow-hidden">
                <div className="px-6 py-4 border-b border-[#EAE5E1] bg-[#F9F5F1] flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#111111]">Registered Users</h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-[#626262] border border-[#EAE5E1]">
                        {users.length} Enrolled
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#FFFCFB] border-b border-[#EAE5E1] text-[11px] font-bold uppercase tracking-wider text-[#858585]">
                            <tr>
                                <th className="px-6 py-3.5 whitespace-nowrap">Name</th>
                                <th className="px-6 py-3.5 whitespace-nowrap">Email</th>
                                <th className="px-6 py-3.5 whitespace-nowrap">Role</th>
                                <th className="px-6 py-3.5 whitespace-nowrap">Joined</th>
                                <th className="px-6 py-3.5 whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0EBE7]">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-[#F9F5F1]/60 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center font-bold text-xs uppercase shrink-0">
                                                {user.name?.charAt(0) || 'U'}
                                            </div>
                                            <div className="font-semibold text-[#111111]">{user.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#626262]">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${
                                            user.role === 'admin' 
                                                ? 'bg-[#FFF4EC] text-[#F36A21] border-[#F36A21]/30' 
                                                : 'bg-[#F9F5F1] text-[#626262] border-[#EAE5E1]'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#858585]">
                                        {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <select
                                            value={user.role}
                                            onChange={(e) => updateUserRole(user._id, e.target.value)}
                                            className="bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21] cursor-pointer"
                                        >
                                            <option value="student">Student</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xs text-[#858585]">No user records found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}