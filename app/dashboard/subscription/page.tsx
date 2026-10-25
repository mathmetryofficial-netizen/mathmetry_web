'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Check, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import AuthPromptModal from '@/components/AuthPromptModal';

export default function SubscriptionPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [selectedPlanDetails, setSelectedPlanDetails] = useState<{ plan: string; amount: number } | null>(null);

    const handlePayment = async (plan: string, amount: number) => {
        if (!session) {
            setSelectedPlanDetails({ plan, amount });
            setAuthModalOpen(true);
            return;
        }

        setLoading(true);

        try {
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

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'Mathmetry',
                description: `Subscription for ${plan} plan`,
                order_id: order.id,
                handler: async function (response: any) {
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
                    color: '#F36A21',
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
        <div className="space-y-10 max-w-5xl mx-auto pb-12">
            <div className="text-center space-y-3">
                <span className="text-xs uppercase tracking-wider font-bold text-[#F36A21]">Full Curriculum Access</span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight">
                    Select Your Preparation Plan
                </h1>
                <p className="text-sm text-[#626262] max-w-xl mx-auto">
                    Continuous access to high-yield chapter notes, timed mock assessments, marking keys, and expert revision series.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {/* Monthly Plan */}
                <div className="bg-white border border-[#EAE5E1] rounded-2xl p-7 flex flex-col justify-between hover:border-[#F36A21]/30 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#626262]">Monthly Pass</span>
                        <h3 className="text-xl font-bold text-[#111111] mt-1">Sprint Revision</h3>
                        <p className="text-xs text-[#626262] mt-2 mb-6">
                            Tailored for final unit-test revisions and short-term assessment prep.
                        </p>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-extrabold text-[#111111]">₹499</span>
                            <span className="text-xs text-[#858585] font-semibold">/ month</span>
                        </div>

                        <ul className="space-y-2.5 text-xs text-[#626262] mb-8">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#F36A21] shrink-0" />
                                <span>All chapter-wise formula notes</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#F36A21] shrink-0" />
                                <span>5 Full-length mock examinations</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#F36A21] shrink-0" />
                                <span>Detailed step-by-step solutions</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        type="button"
                        onClick={() => handlePayment('monthly', 499)}
                        disabled={loading}
                        className="w-full py-2.5 px-4 rounded-xl border border-[#EAE5E1] font-bold text-xs text-[#111111] hover:bg-[#F9F5F1] transition disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Subscribe Monthly'}
                    </button>
                </div>

                {/* Quarterly Plan (Featured) */}
                <div className="bg-white border-2 border-[#F36A21] rounded-2xl p-7 flex flex-col justify-between relative shadow-[0_8px_30px_rgba(243,106,33,0.1)] -translate-y-1">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F36A21] text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                        Most Popular
                    </div>

                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#F36A21]">Term Pass</span>
                        <h3 className="text-xl font-bold text-[#111111] mt-1">Semester Mastery</h3>
                        <p className="text-xs text-[#626262] mt-2 mb-6">
                            Optimal for term-end board examination drills and sustained practice.
                        </p>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-extrabold text-[#111111]">₹1,299</span>
                            <span className="text-xs text-[#858585] font-semibold">/ 3 months</span>
                        </div>

                        <ul className="space-y-2.5 text-xs text-[#626262] mb-8">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#F36A21] shrink-0" />
                                <span>Complete chapter-wise study materials</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#F36A21] shrink-0" />
                                <span>Unlimited timed mock examinations</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#F36A21] shrink-0" />
                                <span>Question palette & automated scoring</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#F36A21] shrink-0" />
                                <span>Priority academic doubt clearance</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        type="button"
                        onClick={() => handlePayment('quarterly', 1299)}
                        disabled={loading}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#F36A21] hover:bg-[#DE5815] font-bold text-xs text-white shadow-sm transition disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Subscribe Quarterly'}
                    </button>
                </div>

                {/* Yearly Plan */}
                <div className="bg-white border border-[#EAE5E1] rounded-2xl p-7 flex flex-col justify-between hover:border-[#F36A21]/30 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#626262]">Annual Pass</span>
                        <h3 className="text-xl font-bold text-[#111111] mt-1">Complete Year</h3>
                        <p className="text-xs text-[#626262] mt-2 mb-6">
                            Comprehensive curriculum coverage from start of term to board final exams.
                        </p>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-extrabold text-[#111111]">₹4,999</span>
                            <span className="text-xs text-[#858585] font-semibold">/ 12 months</span>
                        </div>

                        <ul className="space-y-2.5 text-xs text-[#626262] mb-8">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#F36A21] shrink-0" />
                                <span>Full syllabus access (CBSE / ICSE / Foundation)</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#F36A21] shrink-0" />
                                <span>All future mock test series added automatically</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#F36A21] shrink-0" />
                                <span>Past 10 years solved board papers</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        type="button"
                        onClick={() => handlePayment('yearly', 4999)}
                        disabled={loading}
                        className="w-full py-2.5 px-4 rounded-xl border border-[#EAE5E1] font-bold text-xs text-[#111111] hover:bg-[#F9F5F1] transition disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Subscribe Yearly'}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#858585] pt-4">
                <ShieldCheck className="w-4 h-4 text-[#F36A21]" />
                <span>256-bit encrypted checkout powered by Razorpay. Instant dashboard activation upon payment.</span>
            </div>

            <AuthPromptModal
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                title="Account Required to Subscribe"
                description="Please sign in or create a student account to activate your subscription plan and access all study materials."
                itemName={selectedPlanDetails ? `${selectedPlanDetails.plan.toUpperCase()} Plan` : undefined}
                price={selectedPlanDetails?.amount}
                callbackUrl="/dashboard/subscription"
            />
        </div>
    );
}
