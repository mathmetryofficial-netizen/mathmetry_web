'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useLoading } from '@/components/LoadingProvider';
import Loader from '@/components/Loader';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        classLevel: '',
        school: '',
        city: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showLoader, hideLoader } = useLoading();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        showLoader();

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Auto login after signup
            const loginResult = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (loginResult?.error) {
                router.push('/auth/login');
            } else {
                router.push('/materials');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
            hideLoader();
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
                        Student Registration
                    </span>
                    <h1 className="text-4xl font-extrabold text-[#111111] leading-tight mb-4">
                        Join Mathmetry's Learning Community.
                    </h1>
                    <div className="w-12 h-1 bg-[#F36A21] rounded-full mb-6" />
                    <p className="text-sm text-[#626262] leading-relaxed mb-8">
                        Create your free student account to organize chapter notes, verify board access, and test your readiness with model papers.
                    </p>

                    <div className="space-y-3 pt-6 border-t border-[#EAE5E1]">
                        {[
                            "Instant access to free sample chapters & syllabus maps",
                            "Personalized dashboard tracking your progress",
                            "Secure watermarked study environment"
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
                <div className="w-full max-w-lg space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-[#EAE5E1] shadow-xs">
                    <div>
                        <Link href="/" className="lg:hidden inline-flex items-center gap-2 mb-6">
                            <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                                M
                            </div>
                            <span className="text-lg font-bold text-[#111111]">Mathmetry.</span>
                        </Link>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#111111]">Create Account</h2>
                        <p className="mt-2 text-xs text-[#626262]">
                            Already registered?{' '}
                            <Link href="/auth/login" className="font-bold text-[#F36A21] hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 text-xs font-medium text-[#DC2626] bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                                    Full Name *
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border border-[#EAE5E1] bg-[#FFFCFB] px-3.5 py-2.5 text-sm text-[#111111] focus:border-[#F36A21] focus:ring-1 focus:ring-[#F36A21] focus:outline-none transition-colors"
                                    placeholder="Riya Sen"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                                    Email Address *
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border border-[#EAE5E1] bg-[#FFFCFB] px-3.5 py-2.5 text-sm text-[#111111] focus:border-[#F36A21] focus:ring-1 focus:ring-[#F36A21] focus:outline-none transition-colors"
                                    placeholder="student@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="mobile" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                                    Mobile Number *
                                </label>
                                <input
                                    id="mobile"
                                    name="mobile"
                                    type="tel"
                                    required
                                    pattern="[6-9][0-9]{9}"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border border-[#EAE5E1] bg-[#FFFCFB] px-3.5 py-2.5 text-sm text-[#111111] focus:border-[#F36A21] focus:ring-1 focus:ring-[#F36A21] focus:outline-none transition-colors"
                                    placeholder="9876543210"
                                />
                            </div>

                            <div>
                                <label htmlFor="classLevel" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                                    Class Grade
                                </label>
                                <select
                                    id="classLevel"
                                    name="classLevel"
                                    value={formData.classLevel}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border border-[#EAE5E1] bg-[#FFFCFB] px-3.5 py-2.5 text-sm text-[#111111] focus:border-[#F36A21] focus:ring-1 focus:ring-[#F36A21] focus:outline-none transition-colors"
                                >
                                    <option value="">Select Grade</option>
                                    <option value="Class 7">Class 7</option>
                                    <option value="Class 8">Class 8</option>
                                    <option value="Class 9">Class 9</option>
                                    <option value="Class 10">Class 10</option>
                                    <option value="Class 11">Class 11</option>
                                    <option value="Class 12">Class 12</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="school" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                                    School Name
                                </label>
                                <input
                                    id="school"
                                    name="school"
                                    type="text"
                                    value={formData.school}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border border-[#EAE5E1] bg-[#FFFCFB] px-3.5 py-2.5 text-sm text-[#111111] focus:border-[#F36A21] focus:ring-1 focus:ring-[#F36A21] focus:outline-none transition-colors"
                                    placeholder="Delhi Public School"
                                />
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                                    City
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border border-[#EAE5E1] bg-[#FFFCFB] px-3.5 py-2.5 text-sm text-[#111111] focus:border-[#F36A21] focus:ring-1 focus:ring-[#F36A21] focus:outline-none transition-colors"
                                    placeholder="New Delhi"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                                Password *
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full rounded-xl border border-[#EAE5E1] bg-[#FFFCFB] px-3.5 py-2.5 text-sm text-[#111111] focus:border-[#F36A21] focus:ring-1 focus:ring-[#F36A21] focus:outline-none transition-colors"
                                placeholder="Min 6 characters"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#F36A21] hover:bg-[#DE5815] py-3.5 px-4 text-sm font-bold text-white shadow-xs transition-all disabled:opacity-60"
                            >
                                {isLoading && <Loader size="sm" />}
                                <span>{isLoading ? 'Creating Account...' : 'Complete Registration'}</span>
                                {!isLoading && <ArrowRight size={16} />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
