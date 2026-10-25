'use client';

import Link from "next/link";
import Navbar from "@/components/Navbar";
import ApplicationFooter from "@/components/ApplicationFooter";
import SectionHeading from "@/components/SectionHeading";
import { CheckCircle2, Award, BookOpen, Heart, Target, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#FFFCFB] text-[#111111] flex flex-col font-sans selection:bg-[#FFF4EC] selection:text-[#DE5815]">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero / Mission */}
                <div className="max-w-3xl mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#F36A21] block mb-3">
                        OUR MISSION
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight mb-4">
                        Making Mathematics <br />
                        <span className="text-[#F36A21]">Structured, Clear & Scoring.</span>
                    </h1>
                    <div className="w-12 h-1 bg-[#F36A21] rounded-full mb-6" />
                    <p className="text-lg text-[#626262] leading-relaxed">
                        Mathmetry was established to solve a widespread challenge: school students are often taught rote formulas without understanding method layout, causing them to lose critical marks in school board examinations. We bridge the gap between deep concept mastery and board rubric presentation.
                    </p>
                </div>

                {/* Key Numbers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {[
                        { label: "Active Students", value: "10,000+", sub: "Across India & abroad" },
                        { label: "Curated Resources", value: "500+", sub: "Chapter notes & tests" },
                        { label: "Top Board Score", value: "98%", sub: "Class 10 & 12 Boards" },
                        { label: "Curriculum Boards", value: "3 Boards", sub: "Foundation, ICSE, CBSE" }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white border border-[#EAE5E1] rounded-2xl p-6 shadow-xs">
                            <div className="text-3xl sm:text-4xl font-black text-[#111111] mb-1">{stat.value}</div>
                            <div className="text-sm font-bold text-[#F36A21] mb-1">{stat.label}</div>
                            <div className="text-xs text-[#858585]">{stat.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Core Principles */}
                <div className="mb-20">
                    <SectionHeading
                        eyebrow="Our Approach"
                        title="How We Help Students"
                        highlight="Score Higher."
                        subtitle="Our materials are created to help students understand concepts clearly and write complete solutions in exams."
                        align="left"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Board Presentation Focus",
                                desc: "Every worked problem and derivation demonstrates the exact step-by-step working required by examiners to award full marks."
                            },
                            {
                                icon: BookOpen,
                                title: "Clear, Chapter-Wise Notes",
                                desc: "Our chapter notes focus on core concepts, standard theorems, and formula applications so you can revise without textbook clutter."
                            },
                            {
                                icon: Heart,
                                title: "Affordable One-Time Access",
                                desc: "No monthly recurring fees. A single ₹999 pass provides complete, lifetime access to all study materials for your board."
                            }
                        ].map((principle, idx) => {
                            const IconComponent = principle.icon;
                            return (
                                <div key={idx} className="card-editorial p-8">
                                    <div className="w-12 h-12 rounded-xl bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center mb-6">
                                        <IconComponent size={22} />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#111111] mb-2">{principle.title}</h3>
                                    <p className="text-sm text-[#626262] leading-relaxed">{principle.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-[#F9F5F1] border border-[#EAE5E1] rounded-3xl p-8 sm:p-12 text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-3">
                        Experience Mathmetry for Yourself
                    </h2>
                    <p className="text-sm sm:text-base text-[#626262] max-w-lg mx-auto mb-6">
                        Explore chapter resources for your class or start learning with our structured curriculum.
                    </p>
                    <Link
                        href="/materials"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F36A21] hover:bg-[#DE5815] text-white rounded-full font-bold text-sm shadow-xs transition-colors"
                    >
                        <span>Browse Study Materials</span>
                    </Link>
                </div>
            </main>

            <ApplicationFooter />
        </div>
    );
}
