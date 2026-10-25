"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, User, Settings, LogOut, ArrowRight, ShieldCheck, LayoutDashboard, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = (session?.user as any)?.role === "admin";

  // Dashboard is intentionally removed from the main navbar as it is user-specific.
  // Admin is shown ONLY to users with the admin role.
  const links = [
    { name: "Home", href: "/" },
    { name: "Materials", href: "/materials" },
    { name: "Courses", href: "/courses" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    ...(isAdmin ? [{ name: "Admin", href: "/admin" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFFCFB]/95 backdrop-blur-md border-b border-[#EAE5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Mark */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-base transition-transform group-hover:scale-105">
            M
          </div>
          <span className="text-xl font-bold tracking-tight text-[#111111]">
            Mathmetry<span className="text-[#F36A21]">.</span>
          </span>
        </Link>

        {/* Central Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-[#F9F5F1] p-1.5 rounded-full border border-[#EAE5E1]">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "text-[#111111] bg-white shadow-xs font-semibold"
                    : "text-[#626262] hover:text-[#111111] hover:bg-white/50"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#F36A21] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Button & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Light / Dark Mode Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-[#EAE5E1] bg-white hover:bg-[#F9F5F1] text-[#111111] flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 focus:outline-hidden"
            aria-label={mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
            title={mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun size={18} className="text-[#F36A21] transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon size={18} className="text-[#626262] transition-transform duration-300 hover:-rotate-12" />
              )
            ) : (
              <Sun size={18} className="text-[#F36A21]" />
            )}
          </button>

          {session ? (
            /* Profile Dropdown containing Student Dashboard */
            <div
              className="relative hidden md:block"
              onMouseEnter={() => setProfileDropdownOpen(true)}
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <button 
                type="button"
                className="flex items-center gap-2 p-1.5 pl-3 rounded-full border border-[#EAE5E1] bg-white hover:bg-[#F9F5F1] transition-all"
                aria-expanded={profileDropdownOpen}
              >
                <span className="text-xs font-semibold text-[#111111] max-w-[120px] truncate">
                  {session.user?.name || "Account"}
                </span>
                <div className="w-7 h-7 bg-[#FFF4EC] text-[#F36A21] rounded-full flex items-center justify-center text-xs font-bold">
                  <User size={14} />
                </div>
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#EAE5E1] py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-[#EAE5E1] text-xs">
                      <p className="font-semibold text-[#111111] truncate">{session.user?.name}</p>
                      <p className="text-[#858585] truncate">{session.user?.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#111111] hover:bg-[#FFF4EC] hover:text-[#F36A21] transition-colors"
                      >
                        <LayoutDashboard size={15} className="text-[#F36A21]" />
                        <span>Student Dashboard</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#111111] hover:bg-[#FFF4EC] hover:text-[#F36A21] transition-colors"
                        >
                          <ShieldCheck size={15} className="text-[#F36A21]" />
                          <span>Admin Console</span>
                        </Link>
                      )}

                      <Link
                        href="/materials"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#626262] hover:text-[#111111] hover:bg-[#F9F5F1] transition-colors"
                      >
                        <Settings size={15} />
                        <span>Study Materials</span>
                      </Link>
                    </div>

                    <div className="border-t border-[#EAE5E1] pt-1">
                      <button
                        type="button"
                        onClick={() => signOut()}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#DC2626] hover:bg-[#F9F5F1] w-full text-left transition-colors font-medium"
                      >
                        <LogOut size={15} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-[#626262] hover:text-[#111111] px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#111111] hover:bg-[#F36A21] text-white rounded-full font-semibold text-sm transition-all duration-200 shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 text-[#111111] hover:bg-[#F9F5F1] rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#FFFCFB] border-b border-[#EAE5E1] px-6 py-6 overflow-hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-[#FFF4EC] text-[#F36A21] font-semibold"
                        : "text-[#111111] hover:bg-[#F9F5F1]"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#F36A21]" />}
                  </Link>
                );
              })}

              <div className="h-px bg-[#EAE5E1] my-3" />

              {/* Mobile Drawer Theme Mode Switcher */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#EAE5E1] bg-white my-1">
                <div className="flex items-center gap-2.5">
                  {mounted && theme === "dark" ? (
                    <Moon size={16} className="text-[#F36A21]" />
                  ) : (
                    <Sun size={16} className="text-[#F36A21]" />
                  )}
                  <span className="text-sm font-semibold text-[#111111]">Appearance</span>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9F5F1] border border-[#EAE5E1] text-xs font-bold text-[#111111] hover:bg-[#FFF4EC] hover:text-[#F36A21] transition-colors cursor-pointer"
                  aria-label="Toggle theme mode"
                >
                  {mounted ? (
                    theme === "dark" ? (
                      <>
                        <Sun size={13} className="text-[#F36A21]" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon size={13} className="text-[#626262]" />
                        <span>Dark Mode</span>
                      </>
                    )
                  ) : (
                    <>
                      <Sun size={13} className="text-[#F36A21]" />
                      <span>Light Mode</span>
                    </>
                  )}
                </button>
              </div>

              {session ? (
                <div className="flex flex-col gap-2">
                  <div className="px-4 py-1 text-xs text-[#858585]">
                    Signed in as <span className="font-semibold text-[#111111]">{session.user?.name}</span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="w-full py-2.5 px-4 bg-[#FFF4EC] text-[#F36A21] border border-[#F36A21]/20 font-bold text-center rounded-xl flex items-center justify-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard size={15} />
                    <span>My Dashboard</span>
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="w-full py-2.5 px-4 bg-[#F9F5F1] text-[#111111] font-semibold text-center rounded-xl block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Console
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="w-full py-2.5 px-4 text-[#DC2626] font-semibold text-center rounded-xl hover:bg-[#F9F5F1]"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    href="/auth/login"
                    className="w-full py-3 text-center border border-[#EAE5E1] text-[#111111] font-semibold rounded-full hover:bg-[#F9F5F1] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="w-full py-3 text-center bg-[#F36A21] hover:bg-[#DE5815] text-white font-semibold rounded-full shadow-sm transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started Free
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
