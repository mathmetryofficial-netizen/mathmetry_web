'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useLoading } from '@/components/LoadingProvider';
import Loader from '@/components/Loader';

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
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Visual Side */}
            <div className="hidden lg:flex flex-col justify-center p-12 relative bg-slate-900 text-white overflow-hidden order-last">
                <div className="absolute inset-0 bg-gradient-to-bl from-indigo-600/20 to-slate-900 z-0" />
                <div className="relative z-10 max-w-lg">
                    <Link href="/" className="mb-10 block text-2xl font-bold">Mathmetry</Link>
                    <h1 className="text-4xl font-bold mb-6">Join the Community</h1>
                    <p className="text-lg text-slate-300">
                        Start your journey today. Get unlimited access to premium math content and analytics.
                    </p>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
                <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Create Account</h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Already have an account?{' '}
                            <Link href="/auth/login" className="font-medium text-primary hover:text-primary/90">
                                Log in
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Full Name *
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border dark:bg-slate-800 dark:border-slate-700"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Email address *
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border dark:bg-slate-800 dark:border-slate-700"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Mobile Number *
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="mobile"
                                        name="mobile"
                                        type="tel"
                                        required
                                        pattern="[6-9][0-9]{9}"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border dark:bg-slate-800 dark:border-slate-700"
                                        placeholder="9876543210"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="classLevel" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Class Level
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="classLevel"
                                        name="classLevel"
                                        value={formData.classLevel}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border dark:bg-slate-800 dark:border-slate-700"
                                    >
                                        <option value="">Select Class</option>
                                        <option value="Class 9">Class 9</option>
                                        <option value="Class 10">Class 10</option>
                                        <option value="Class 11">Class 11</option>
                                        <option value="Class 12">Class 12</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="school" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    School Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="school"
                                        name="school"
                                        type="text"
                                        value={formData.school}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border dark:bg-slate-800 dark:border-slate-700"
                                        placeholder="Delhi Public School"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    City
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border dark:bg-slate-800 dark:border-slate-700"
                                        placeholder="New Delhi"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Password *
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border dark:bg-slate-800 dark:border-slate-700"
                                        placeholder="Min 6 characters"
                                    />
                                </div>
                            </div>
                        </div>



                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center items-center gap-2 rounded-md bg-primary px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                            >
                                {isLoading && <Loader size="sm" />}
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
