'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, FileText, ClipboardList, ArrowLeft, LogOut, ShieldCheck, Menu, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
            <div className="min-h-screen bg-[#FFFCFB] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader size="md" />
                    <p className="text-xs font-semibold text-[#858585]">Verifying administrator credentials...</p>
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
        { name: 'Board Access', href: '/admin/board-access', icon: ShieldCheck },
    ];

    return (
        <div className="min-h-screen bg-[#FFFCFB] text-[#111111] flex font-sans selection:bg-[#FFF4EC] selection:text-[#DE5815]">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Responsive Sidebar */}
            <aside className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#F9F5F1] border-r border-[#EAE5E1] transition-transform duration-200 lg:translate-x-0 lg:static flex flex-col justify-between ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div>
                    <div className="p-6 border-b border-[#EAE5E1] flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm">
                                M
                            </div>
                            <div>
                                <h1 className="text-base font-bold text-[#111111]">
                                    Mathmetry<span className="text-[#F36A21]">.</span>
                                </h1>
                                <p className="text-[10px] uppercase font-bold tracking-wider text-[#F36A21]">Admin Console</p>
                            </div>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-1 rounded-lg text-[#626262] hover:bg-white lg:hidden"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    
                    <nav className="p-4 space-y-1">
                        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#858585]">
                            Management
                        </div>
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                        isActive
                                            ? 'bg-white text-[#F36A21] border border-[#EAE5E1] shadow-xs'
                                            : 'text-[#626262] hover:bg-white/60 hover:text-[#111111]'
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#F36A21]' : 'text-[#858585]'}`} />
                                    <span>{item.name}</span>
                                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F36A21]" />}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                
                <div className="p-4 border-t border-[#EAE5E1] space-y-1.5">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#626262] hover:bg-white hover:text-[#111111] transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Student Dashboard</span>
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#DC2626] hover:bg-[#FEF2F2] transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 flex flex-col">
                {/* Mobile Admin Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#EAE5E1] bg-[#FFFCFB]/90 px-6 backdrop-blur-md lg:hidden">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-[#111111] hover:bg-[#F9F5F1] rounded-xl border border-[#EAE5E1] bg-white touch-target-44"
                            aria-label="Open admin sidebar"
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <span className="font-bold text-sm text-[#111111]">Admin Console</span>
                        </div>
                    </div>
                    <Link href="/" className="text-xs font-semibold text-[#F36A21]">
                        Home →
                    </Link>
                </header>

                <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full flex-1 overflow-x-hidden">
                    {children}
                </div>
            </main>
        </div>
    );
}