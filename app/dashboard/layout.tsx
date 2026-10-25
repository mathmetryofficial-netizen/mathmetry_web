'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
    LayoutDashboard, 
    BookOpen, 
    ClipboardList, 
    BarChart3, 
    ShieldCheck, 
    LogOut, 
    Menu, 
    User,
    ArrowLeft
} from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isAdmin = session?.user?.role === 'admin';

    const navItems = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Study Materials', href: '/dashboard/materials', icon: BookOpen },
        { name: 'Online Exams', href: '/dashboard/exams', icon: ClipboardList },
        { name: 'Performance Analytics', href: '/dashboard/performance', icon: BarChart3 },
    ];

    if (isAdmin) {
        navItems.push({ name: 'Admin Panel', href: '/admin', icon: ShieldCheck });
    }

    return (
        <div className="min-h-screen bg-[#FFFCFB] text-[#111111] flex font-sans selection:bg-[#FFF4EC] selection:text-[#DE5815]">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#F9F5F1] border-r border-[#EAE5E1] transition-transform duration-200 lg:translate-x-0 lg:static flex flex-col justify-between ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div>
                    {/* Brand Header */}
                    <div className="flex h-20 items-center justify-between px-6 border-b border-[#EAE5E1]">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm">
                                M
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[#111111]">
                                Mathmetry<span className="text-[#F36A21]">.</span>
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Items */}
                    <nav className="p-4 space-y-1.5">
                        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#858585]">
                            Student Portal
                        </div>
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                                        isActive
                                            ? 'bg-white text-[#F36A21] border border-[#EAE5E1] shadow-xs'
                                            : 'text-[#626262] hover:text-[#111111] hover:bg-white/60'
                                    }`}
                                >
                                    <IconComponent size={17} className={isActive ? 'text-[#F36A21]' : 'text-[#858585]'} />
                                    <span>{item.name}</span>
                                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F36A21]" />}
                                </Link>
                            );
                        })}

                        <div className="pt-4 border-t border-[#EAE5E1] mt-4">
                            <Link
                                href="/materials"
                                className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-[#111111] bg-[#FFF4EC] border border-[#F36A21]/30 rounded-xl hover:bg-[#F36A21] hover:text-white transition-all group"
                            >
                                <BookOpen size={16} className="text-[#F36A21] group-hover:text-white" />
                                <span>Browse All Chapters</span>
                            </Link>
                        </div>
                    </nav>
                </div>

                {/* User Info & Sign Out Footer */}
                <div className="p-4 border-t border-[#EAE5E1]">
                    <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-[#EAE5E1] mb-2">
                        <div className="h-8 w-8 rounded-lg bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center font-bold text-xs uppercase shrink-0">
                            {session?.user?.name?.[0] || 'S'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-bold truncate text-[#111111]">
                                {session?.user?.name}
                            </p>
                            <p className="text-[11px] text-[#858585] truncate">
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                    >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 flex flex-col">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#EAE5E1] bg-[#FFFCFB]/90 px-6 backdrop-blur-md lg:hidden">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-[#111111] hover:bg-[#F9F5F1] rounded-xl border border-[#EAE5E1] bg-white touch-target-44 flex items-center justify-center lg:hidden cursor-pointer"
                            aria-label="Open sidebar"
                        >
                            <Menu size={20} />
                        </button>
                        <span className="font-bold text-base text-[#111111]">Dashboard</span>
                    </div>
                    <Link href="/" className="text-xs font-semibold text-[#F36A21]">
                        Home →
                    </Link>
                </header>

                <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
