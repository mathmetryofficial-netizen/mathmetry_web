import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ApplicationFooter from '@/components/ApplicationFooter';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-[#FFFCFB] text-[#111111] flex flex-col font-sans selection:bg-[#FFF4EC] selection:text-[#DE5815]">
            <Navbar />

            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <Link href="/" className="text-xs font-bold text-[#F36A21] hover:underline mb-6 inline-flex items-center gap-1.5">
                    ← Back to Home
                </Link>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight mb-2">
                    Cancellation & Refund Policy
                </h1>
                <div className="w-12 h-1 bg-[#F36A21] rounded-full mb-6" />
                <p className="text-xs text-[#858585] mb-12">Last updated: October 2026</p>

                <div className="space-y-10 text-sm leading-relaxed text-[#626262]">
                    <section className="bg-white p-8 rounded-2xl border border-[#EAE5E1] shadow-xs">
                        <h2 className="text-xl font-bold text-[#111111] mb-3">1. Overview</h2>
                        <p>
                            Mathmetry provides digital educational services including chapter notes, formula sheets, interactive courses,
                            and timed exam access. This document outlines our cancellation and refund terms for all board access transactions.
                        </p>
                    </section>

                    <section className="bg-white p-8 rounded-2xl border border-[#EAE5E1] shadow-xs">
                        <h2 className="text-xl font-bold text-[#111111] mb-3">2. Instant Digital Delivery</h2>
                        <p>
                            Upon successful completion of payment via Razorpay, access to the selected Board and Class is activated immediately
                            in real-time. Because full curriculum resources become viewable upon transaction confirmation, digital goods cannot
                            be returned or revoked once delivered.
                        </p>
                    </section>

                    <section className="bg-[#FFF4EC] p-8 rounded-2xl border border-[#F36A21]/30">
                        <h2 className="text-xl font-bold text-[#111111] mb-3">3. All Sales Are Final</h2>
                        <p className="text-[#111111] font-semibold mb-3">
                            All board access purchases are non-refundable. Please confirm your selected Class and Board before completing payment.
                        </p>
                        <p className="text-xs text-[#626262]">
                            If an erroneous duplicate charge occurs due to network timeout or banking gateway error, please reach out to our billing
                            desk at <a href="mailto:mathmetry.official@gmail.com" className="text-[#F36A21] font-bold underline">mathmetry.official@gmail.com</a> with
                            your Razorpay Payment ID for immediate reconciliation.
                        </p>
                    </section>

                    <section className="bg-white p-8 rounded-2xl border border-[#EAE5E1] shadow-xs">
                        <h2 className="text-xl font-bold text-[#111111] mb-3">4. Lifetime Board Inclusions</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Permanent access to all chapters for the purchased class and board combination.</li>
                            <li>Free automatic access to future curriculum additions for that board.</li>
                            <li>Continuous access to timed online examination papers and answer explanations.</li>
                        </ul>
                    </section>
                </div>
            </main>

            <ApplicationFooter />
        </div>
    );
}
