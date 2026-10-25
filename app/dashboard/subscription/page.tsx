'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SubscriptionPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Extend the window object to include Razorpay
    const handlePayment = async (plan: string, amount: number) => {
        if (!session) {
            router.push('/auth/login');
            return;
        }

        setLoading(true);

        try {
            // 1. Create Order
            const res = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan, amount }),
            });

            const order = await res.json();

            if (!res.ok) {
                alert('Could not create order');
                setLoading(false);
                return;
            }

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use NEXT_PUBLIC prefix for client-side
                amount: order.amount,
                currency: order.currency,
                name: 'Mathmetry',
                description: `Subscription for ${plan} plan`,
                order_id: order.id,
                handler: async function (response: any) {
                    // 3. Verify Payment
                    const verifyRes = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            plan,
                            amount
                        }),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyRes.ok) {
                        router.push('/dashboard?payment=success');
                    } else {
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: session.user?.name,
                    email: session.user?.email,
                },
                theme: {
                    color: '#4f46e5',
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error(error);
            alert('Payment failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Choose Your Plan</h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Unlock unlimited access to all study materials, exams, and detailed performance analytics.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Monthly Plan */}
                <div className="relative p-8 bg-white border border-slate-200 rounded-2xl shadow-sm dark:bg-slate-800 dark:border-slate-700 flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Monthly</h3>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm">Perfect for short-term revision.</p>
                    <div className="my-6">
                        <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">₹499</span>
                        <span className="text-sm font-semibold leading-6 text-slate-600 dark:text-slate-400">/mo</span>
                    </div>
                    <button
                        onClick={() => handlePayment('monthly', 499)}
                        disabled={loading}
                        className="mt-auto block w-full rounded-md bg-indigo-50 px-3 py-2 text-center text-sm font-semibold text-indigo-600 hover:bg-indigo-100 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Subscribe Monthly'}
                    </button>
                </div>

                {/* Quarterly Plan */}
                <div className="relative p-8 bg-white border-2 border-indigo-600 rounded-2xl shadow-lg dark:bg-slate-800 flex flex-col transform scale-105 z-10">
                    <div className="absolute top-0 right-0 -mr-1 -mt-1 w-24 h-24 rounded-full bg-indigo-600/10 -z-10 blur-xl"></div>
                    <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-bl-lg rounded-tr-lg">POPULAR</div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quarterly</h3>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm">Best value for exam preparation.</p>
                    <div className="my-6">
                        <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">₹1299</span>
                        <span className="text-sm font-semibold leading-6 text-slate-600 dark:text-slate-400">/3mo</span>
                    </div>
                    <button
                        onClick={() => handlePayment('quarterly', 1299)}
                        disabled={loading}
                        className="mt-auto block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500 shadow-md disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Subscribe Quarterly'}
                    </button>
                </div>

                {/* Yearly Plan */}
                <div className="relative p-8 bg-white border border-slate-200 rounded-2xl shadow-sm dark:bg-slate-800 dark:border-slate-700 flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Yearly</h3>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm">Long-term learning & improvement.</p>
                    <div className="my-6">
                        <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">₹4999</span>
                        <span className="text-sm font-semibold leading-6 text-slate-600 dark:text-slate-400">/yr</span>
                    </div>
                    <button
                        onClick={() => handlePayment('yearly', 4999)}
                        disabled={loading}
                        className="mt-auto block w-full rounded-md bg-indigo-50 px-3 py-2 text-center text-sm font-semibold text-indigo-600 hover:bg-indigo-100 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Subscribe Yearly'}
                    </button>
                </div>
            </div>
        </div>
    );
}
