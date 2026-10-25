'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLoading } from '@/components/LoadingProvider';
import Loader from '@/components/Loader';
import { ArrowRight, CheckCircle2, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showLoader, hideLoader } = useLoading();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        showLoader();

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError('Invalid email or password');
            setIsLoading(false);
            hideLoader();
        } else if (result?.ok) {
            window.location.href = '/materials';
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-12 bg-[#FFFCFB] font-sans selection:bg-[#FFF4EC] selection:text-[#DE5815]">
            {/* Visual Editorial Side */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-[#F9F5F1] border-r border-[#EAE5E1] relative">
                <div>
                    <Link href="/" className="inline-flex items-center gap-2 mb-12 group">
                        <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm">
                            M
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[#111111]">
                            Mathmetry<span className="text-[#F36A21]">.</span>
                        </span>
                    </Link>

                    <span className="text-xs font-bold uppercase tracking-wider text-[#F36A21] bg-[#FFF4EC] border border-[#F36A21]/20 px-3 py-1 rounded-full inline-block mb-4">
                        Welcome Back
                    </span>
                    <h1 className="text-4xl font-extrabold text-[#111111] leading-tight mb-4">
                        Continue Your Academic Preparation.
                    </h1>
                    <div className="w-12 h-1 bg-[#F36A21] rounded-full mb-6" />
                    <p className="text-sm text-[#626262] leading-relaxed mb-8">
                        Sign in to access your purchased board materials, chapter-wise formula banks, and online mock tests.
                    </p>

                    <div className="space-y-3 pt-6 border-t border-[#EAE5E1]">
                        {[
                            "Instant access to Foundation, ICSE & CBSE materials",
                            "Secure watermarked distraction-free reading",
                            "Timed practice tests with rubric marking answers"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#111111]">
                                <CheckCircle2 size={15} className="text-[#F36A21] shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-xs text-[#858585] pt-8">
                    © {new Date().getFullYear()} Mathmetry. All rights reserved.
                </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-[#EAE5E1] shadow-xs">
                    <div>
                        <Link href="/" className="lg:hidden inline-flex items-center gap-2 mb-6">
                            <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                                M
                            </div>
                            <span className="text-lg font-bold text-[#111111]">Mathmetry.</span>
                        </Link>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#111111]">Sign In</h2>
                        <p className="mt-2 text-xs text-[#626262]">
                            New to Mathmetry?{' '}
                            <Link href="/auth/signup" className="font-bold text-[#F36A21] hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 text-xs font-medium text-[#DC2626] bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-xl border border-[#EAE5E1] bg-[#FFFCFB] px-4 py-3 text-sm text-[#111111] focus:border-[#F36A21] focus:ring-1 focus:ring-[#F36A21] focus:outline-none transition-colors"
                                    placeholder="student@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-xl border border-[#EAE5E1] bg-[#FFFCFB] px-4 py-3 text-sm text-[#111111] focus:border-[#F36A21] focus:ring-1 focus:ring-[#F36A21] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#F36A21] hover:bg-[#DE5815] py-3.5 px-4 text-sm font-bold text-white shadow-xs transition-all disabled:opacity-60"
                            >
                                {isLoading && <Loader size="sm" />}
                                <span>{isLoading ? 'Signing In...' : 'Sign In to Mathmetry'}</span>
                                {!isLoading && <ArrowRight size={16} />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
