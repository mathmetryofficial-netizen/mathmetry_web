'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ApplicationFooter from "@/components/ApplicationFooter";
import SectionHeading from "@/components/SectionHeading";
import Loader from "@/components/Loader";
import { BookOpen, Clock, ArrowRight, Play, Sparkles } from "lucide-react";

interface Course {
    _id: string;
    title: string;
    description: string;
    subject: string;
    classLevel: string;
    price: number;
    duration?: string;
    thumbnail?: string;
    isPublished?: boolean;
    createdAt?: string;
}

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLiveCourses = async () => {
            try {
                const response = await fetch('/api/courses');
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data.courses || []);
                }
            } catch (error) {
                console.error('Failed to fetch live courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLiveCourses();
    }, []);

    return (
        <div className="min-h-screen bg-[#FFFCFB] text-[#111111] flex flex-col font-sans selection:bg-[#FFF4EC] selection:text-[#DE5815]">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeading
                    eyebrow="COURSE CATALOG"
                    title="Comprehensive Mathematics"
                    highlight="Video Courses."
                    subtitle="Topic-by-topic guided video courses and masterclasses created directly by senior faculty."
                />

                {loading ? (
                    <div className="min-h-[40vh] flex items-center justify-center">
                        <Loader size="md" />
                    </div>
                ) : courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {courses.map((course) => (
                            <div
                                key={course._id}
                                className="card-editorial p-7 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F36A21]">
                                            {course.subject || "Mathematics"}
                                        </span>
                                        <span className="text-xs text-[#858585] font-semibold">
                                            {course.classLevel}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-[#111111] mb-2 leading-snug">
                                        {course.title}
                                    </h3>

                                    <p className="text-xs text-[#626262] leading-relaxed mb-6 line-clamp-3">
                                        {course.description}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between text-xs text-[#858585] py-3 border-t border-[#F0EBE7] mb-5">
                                        <span className="flex items-center gap-1.5 text-[#111111] font-bold text-sm">
                                            ₹{course.price}
                                        </span>
                                        {course.duration && (
                                            <span className="flex items-center gap-1 text-[#626262]">
                                                <Clock size={13} className="text-[#F36A21]" />
                                                {course.duration}
                                            </span>
                                        )}
                                    </div>

                                    <Link
                                        href="/materials"
                                        className="w-full py-2.5 px-4 bg-[#111111] hover:bg-[#F36A21] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                                    >
                                        <Play size={13} />
                                        <span>View Course Materials</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Live Database Empty State — When 0 courses exist in DB */
                    <div className="max-w-xl mx-auto bg-white border border-[#EAE5E1] rounded-3xl p-10 sm:p-12 text-center mb-16 shadow-xs">
                        <div className="w-14 h-14 rounded-2xl bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center mx-auto mb-5 shadow-xs">
                            <BookOpen size={26} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F36A21] block mb-2">
                          LIVE CATALOG
                        </span>
                        <h3 className="text-2xl font-bold text-[#111111] mb-2">
                            No Video Courses Published Yet
                        </h3>
                        <p className="text-xs sm:text-sm text-[#626262] leading-relaxed mb-8 max-w-md mx-auto">
                            New video lectures and problem-solving masterclasses will appear here once published by instructors. In the meantime, you can explore all chapter notes in the materials catalog.
                        </p>
                        <Link
                            href="/materials"
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F36A21] hover:bg-[#DE5815] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                        >
                            <span>Browse Chapter Study Materials</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                )}

                {/* Mentorship Inquiries Banner */}
                <div className="bg-[#F9F5F1] border border-[#EAE5E1] rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-3">
                        Need 1-on-1 Academic Mentorship?
                    </h3>
                    <p className="text-sm sm:text-base text-[#626262] max-w-xl mx-auto mb-6 leading-relaxed">
                        In addition to our structured chapter materials and video modules, explore personalized 1-on-1 guidance and doubt clearance.
                    </p>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-7 py-3 bg-[#111111] hover:bg-[#F36A21] text-white rounded-full font-bold text-sm shadow-xs transition-colors"
                    >
                        <span>Explore Mentorship Services</span>
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </main>

            <ApplicationFooter />
        </div>
    );
}
