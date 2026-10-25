'use client';

import Link from "next/link";
import Navbar from "@/components/Navbar";
import ApplicationFooter from "@/components/ApplicationFooter";
import SectionHeading from "@/components/SectionHeading";
import { Mail, MessageSquare, HelpCircle, Shield, FileText, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        {
            q: "How does the ₹999 One-Time Board Access work?",
            a: "When you purchase access for a specific board (Foundation, ICSE, or CBSE) and class, your account receives permanent, unrestricted access to all chapter notes, formula sheets, and past papers for that board. There are no recurring monthly charges."
        },
        {
            q: "Can I download or print the chapter materials?",
            a: "To prevent unauthorized redistribution and protect intellectual property, all materials are viewed inside our distraction-free, encrypted, watermarked digital viewer. The viewer works seamlessly on mobile, tablet, and desktop browsers."
        },
        {
            q: "What payment methods are supported for board access?",
            a: "We support all major Indian and international payment methods via our secure Razorpay integration, including UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, and Net Banking."
        },
        {
            q: "How quickly is access granted after payment?",
            a: "Access is granted immediately upon successful payment verification. You will be redirected right back to the chapter materials catalog with full viewing permissions."
        },
        {
            q: "How do the timed mock exams work?",
            a: "Students can take full-length or chapter-wise timed tests online. At the end of the test, an instant performance breakdown, score calculation, and model solution explanations are provided."
        }
    ];

    return (
        <div className="min-h-screen bg-[#FFFCFB] text-[#111111] flex flex-col font-sans selection:bg-[#FFF4EC] selection:text-[#DE5815]">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeading
                    eyebrow="Help & Inquiries"
                    title="How Can We Help You"
                    highlight="Excel?"
                    subtitle="Have questions about board coverage, accessing study materials, or billing? Our academic support desk is ready to assist."
                />

                {/* Support Channels */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
                    <div className="card-editorial p-8 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-xl bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center mb-5">
                            <Mail size={22} />
                        </div>
                        <h3 className="text-lg font-bold text-[#111111] mb-1">Email Support</h3>
                        <p className="text-xs text-[#626262] mb-4">Inquiries answered within 24 hours</p>
                        <a
                            href="mailto:mathmetry.official@gmail.com"
                            className="text-xs font-bold text-[#F36A21] hover:underline"
                        >
                            mathmetry.official@gmail.com
                        </a>
                    </div>

                    <div className="card-editorial p-8 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-xl bg-[#F9F5F1] text-[#111111] flex items-center justify-center mb-5">
                            <Shield size={22} className="text-[#F36A21]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#111111] mb-1">Board Access Assistance</h3>
                        <p className="text-xs text-[#626262] mb-4">Payment or account activation queries</p>
                        <Link
                            href="/materials"
                            className="text-xs font-bold text-[#111111] hover:text-[#F36A21]"
                        >
                            View Materials Portal →
                        </Link>
                    </div>

                    <div className="card-editorial p-8 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-xl bg-[#F9F5F1] text-[#111111] flex items-center justify-center mb-5">
                            <FileText size={22} className="text-[#F36A21]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#111111] mb-1">Curriculum Advice</h3>
                        <p className="text-xs text-[#626262] mb-4">Choose between Foundation, ICSE, or CBSE</p>
                        <Link
                            href="/services"
                            className="text-xs font-bold text-[#111111] hover:text-[#F36A21]"
                        >
                            Explore Services →
                        </Link>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] text-center mb-3">
                        Frequently Asked Questions
                    </h3>
                    <div className="w-12 h-1 bg-[#F36A21] rounded-full mx-auto mb-8" />

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-[#EAE5E1] rounded-2xl overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#111111]"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown
                                        size={18}
                                        className={`text-[#F36A21] transition-transform duration-200 shrink-0 ${
                                            openFaq === idx ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                {openFaq === idx && (
                                    <div className="px-6 pb-6 text-xs sm:text-sm text-[#626262] leading-relaxed border-t border-[#F0EBE7] pt-4">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <ApplicationFooter />
        </div>
    );
}
