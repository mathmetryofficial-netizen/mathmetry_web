'use client';

import Link from "next/link";
import Navbar from "@/components/Navbar";
import ApplicationFooter from "@/components/ApplicationFooter";
import SectionHeading from "@/components/SectionHeading";
import { Check, Mail, MessageSquare, Phone, UserCheck, HelpCircle, FileCheck, ArrowRight } from "lucide-react";

export default function ServicesPage() {
    const services = [
        {
            icon: UserCheck,
            title: "1-on-1 Board Mentorship",
            description: "Personalized online tutoring with senior mathematics educators tailored to your specific weak chapters.",
            highlights: [
                "Custom diagnostic assessment to find knowledge gaps",
                "Flexible scheduling around school timings",
                "Direct focus on high-weightage board topics",
                "Regular parent-teacher progress updates"
            ],
            badge: "Personalized"
        },
        {
            icon: MessageSquare,
            title: "Priority Doubt Clearance",
            description: "Never stay stuck on a tricky theorem or textbook problem. Submit your queries for step-by-step breakdown.",
            highlights: [
                "Detailed written proofs & video solutions",
                "Dedicated mathematics problem-solving desk",
                "Covering Foundation, ICSE & CBSE problems",
                "Step-wise rubric hints for board exams"
            ],
            badge: "Continuous"
        },
        {
            icon: FileCheck,
            title: "Mock Paper Grading & Feedback",
            description: "Submit written mock examination papers and receive detailed method corrections modeled after board evaluation standards.",
            highlights: [
                "Line-by-line mark allocation breakdown",
                "Identification of presentation mistakes",
                "Speed & time allocation recommendations",
                "Model answer sheet comparisons"
            ],
            badge: "Exam Ready"
        }
    ];

    return (
        <div className="min-h-screen bg-[#FFFCFB] text-[#111111] flex flex-col font-sans selection:bg-[#FFF4EC] selection:text-[#DE5815]">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeading
                    eyebrow="Academic Services"
                    title="Targeted Academic Mentorship &"
                    highlight="Evaluation."
                    subtitle="Personalized guidance and paper evaluations to support your school and board examination preparation."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {services.map((svc) => {
                        const IconComponent = svc.icon;
                        return (
                            <div
                                key={svc.title}
                                className="card-editorial p-8 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F36A21]">
                                            {svc.badge}
                                        </span>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-[#F9F5F1] border border-[#EAE5E1] text-[#111111] flex items-center justify-center mb-6">
                                        <IconComponent size={22} className="text-[#F36A21]" />
                                    </div>

                                    <h3 className="text-xl font-bold text-[#111111] mb-2 leading-snug">
                                        {svc.title}
                                    </h3>

                                    <p className="text-xs text-[#626262] leading-relaxed mb-6">
                                        {svc.description}
                                    </p>

                                    <div className="space-y-2.5 pt-4 border-t border-[#F0EBE7] mb-8">
                                        {svc.highlights.map((h, i) => (
                                            <div key={i} className="flex items-start gap-2.5 text-xs text-[#111111]">
                                                <div className="w-4 h-4 rounded-full bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check size={11} strokeWidth={3} />
                                                </div>
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    href="/support"
                                    className="w-full py-2.5 px-4 bg-[#111111] hover:bg-[#F36A21] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors"
                                >
                                    <span>Inquire for Details</span>
                                    <ArrowRight size={13} />
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* Contact Inquiries Banner */}
                <div className="bg-[#F9F5F1] border border-[#EAE5E1] rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-3">
                        Have Questions About Enrollment?
                    </h3>
                    <p className="text-sm sm:text-base text-[#626262] max-w-xl mx-auto mb-6 leading-relaxed">
                        Our academic advisors can guide you toward the right board package, revision sets, or mentorship option.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/support"
                            className="inline-flex items-center gap-2 px-7 py-3 bg-[#F36A21] hover:bg-[#DE5815] text-white rounded-full font-bold text-sm shadow-xs transition-colors"
                        >
                            <span>Contact Academic Support</span>
                            <ArrowRight size={15} />
                        </Link>
                        <a
                            href="mailto:mathmetry.official@gmail.com"
                            className="inline-flex items-center gap-2 px-7 py-3 bg-white hover:bg-[#FFFCFB] text-[#111111] border border-[#EAE5E1] rounded-full font-semibold text-sm transition-colors"
                        >
                            <Mail size={15} className="text-[#F36A21]" />
                            <span>mathmetry.official@gmail.com</span>
                        </a>
                    </div>
                </div>
            </main>

            <ApplicationFooter />
        </div>
    );
}
