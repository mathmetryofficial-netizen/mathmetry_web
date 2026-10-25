"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { data: session } = useSession();

    const links = [
        { name: "Home", href: "/" },
        { name: "Materials", href: "/materials" },
        ...(session ? [{ name: "Dashboard", href: "/dashboard" }] : []),
        ...(session?.user?.role === 'admin' ? [{ name: "Admin", href: "/admin" }] : []),
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 relative z-50">
            {/* Logo */}
            <div className="flex-1 flex items-center justify-start z-50">
                <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-sm">M</div>
                    Mathmetry
                </Link>
            </div>

            {/* Desktop Menu Items */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-8 font-medium text-slate-500">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="hover:text-slate-900 transition text-sm lg:text-base"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex-1 flex items-center justify-end gap-4">
                {session ? (
                    /* Profile Dropdown */
                    <div 
                        className="relative hidden md:block"
                        onMouseEnter={() => setProfileDropdownOpen(true)}
                        onMouseLeave={() => setProfileDropdownOpen(false)}
                    >
                        <button className="flex items-center gap-2 p-2 rounded-full hover:bg-slate-100 transition">
                            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                                <User size={16} className="text-slate-600" />
                            </div>
                        </button>
                        
                        <AnimatePresence>
                            {profileDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2"
                                >
                                    <Link
                                        href="/settings"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                    >
                                        <Settings size={16} />
                                        Settings
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full text-left"
                                    >
                                        <LogOut size={16} />
                                        Sign Out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <Link
                        href="/auth/signup"
                        className="hidden md:block px-6 py-2 bg-black text-white rounded-full font-bold text-sm hover:scale-105 transition-transform"
                    >
                        Start
                    </Link>
                )}

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-900 z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute inset-x-0 top-0 bg-white shadow-2xl p-6 pt-24 pb-12 rounded-b-[2rem] flex flex-col items-center gap-6 md:hidden z-40 border-b border-slate-100"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-bold text-slate-900 w-full text-center py-2 hover:bg-slate-50 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        
                        <div className="w-full h-px bg-slate-100 my-2"></div>
                        
                        {session ? (
                            <div className="w-full space-y-2">
                                <Link
                                    href="/settings"
                                    className="w-full py-2 text-slate-900 font-bold text-center block hover:bg-slate-50 rounded-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Settings
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="w-full py-2 text-slate-900 font-bold text-center hover:bg-slate-50 rounded-lg"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/auth/signup"
                                className="w-full py-3 bg-black text-white rounded-full font-bold text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
