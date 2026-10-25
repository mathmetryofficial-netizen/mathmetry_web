'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, FileText, ClipboardList, ArrowLeft, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Loader from '@/components/Loader';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') return;
        
        if (status === 'unauthenticated') {
            router.push('/auth/login');
            return;
        }

        // @ts-ignore
        if (session?.user?.role !== 'admin') {
            router.push('/dashboard');
        }
    }, [status, session, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader size="lg" />
                    <p className="text-slate-600">Verifying access...</p>
                </div>
            </div>
        );
    }

    // @ts-ignore
    if (!session || session?.user?.role !== 'admin') {
        return null;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Courses', href: '/admin/courses', icon: BookOpen },
        { name: 'Materials', href: '/admin/materials', icon: FileText },
        { name: 'Exams', href: '/admin/exams', icon: ClipboardList },
        { name: 'Board Access', href: '/admin/board-access', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-[#F7F8FC]">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-72 bg-white border-r border-slate-200 min-h-screen flex flex-col">
                    <div className="p-6 border-b border-slate-200">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">M</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">Mathmetry</h1>
                                <p className="text-xs text-slate-500">Admin Panel</p>
                            </div>
                        </Link>
                    </div>
                    
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                        isActive
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                    
                    <div className="p-4 border-t border-slate-200 space-y-2">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Dashboard
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 overflow-auto">
                    <div className="p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}