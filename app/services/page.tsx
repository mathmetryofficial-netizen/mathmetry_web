import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-[#F7F8FC] flex justify-center p-4 md:p-8 font-sans">
            <div className="w-full max-w-[1400px] bg-white rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col min-h-[90vh]">

                <nav className="flex items-center justify-between px-8 py-6 md:px-12 border-b border-slate-100">
                    <div className="flex-1 flex items-center justify-start">
                        <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white">M</div>
                            Mathmetry
                        </Link>
                    </div>
                    <div className="hidden md:flex flex-1 items-center justify-center gap-8 font-medium text-slate-500">
                        <Link href="/" className="hover:text-slate-900 transition">Home</Link>
                        <Link href="/courses" className="hover:text-slate-900 transition">Courses</Link>
                        <Link href="/services" className="text-slate-900 font-bold">Services</Link>
                        <Link href="/support" className="hover:text-slate-900 transition">Support</Link>
                        <Link href="/about" className="hover:text-slate-900 transition">About</Link>
                    </div>
                    <div className="flex-1 flex items-center justify-end">
                        <Link href="/auth/signup" className="px-6 py-2 bg-black text-white rounded-full font-bold text-sm hover:scale-105 transition-transform">
                            Start
                        </Link>
                    </div>
                </nav>

                <main className="flex-1 p-8 md:p-12">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl font-bold text-slate-900 mb-6">Our Services</h1>
                        <p className="text-lg text-slate-600">
                            Beyond just courses, we offer a range of services to ensure your mathematical journey is smooth and successful.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 px-4">
                        <div className="bg-indigo-50 rounded-3xl p-8 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-2xl">🎓</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">1-on-1 Tutoring</h3>
                            <p className="text-slate-600 mb-6">Personalized attention from expert math tutors to help you conquer difficult topics.</p>
                            <ul className="text-left w-full space-y-2 mb-8">
                                <li className="flex items-center text-sm text-slate-700 gap-2"><CheckCircle size={16} className="text-indigo-500" /> Flexible Scheduling</li>
                                <li className="flex items-center text-sm text-slate-700 gap-2"><CheckCircle size={16} className="text-indigo-500" /> Personalized Plan</li>
                                <li className="flex items-center text-sm text-slate-700 gap-2"><CheckCircle size={16} className="text-indigo-500" /> Progress Tracking</li>
                            </ul>
                        </div>

                        <div className="bg-emerald-50 rounded-3xl p-8 flex flex-col items-center text-center border-2 border-emerald-100">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-2xl">💬</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Live Doubt Clearing</h3>
                            <p className="text-slate-600 mb-6">Stuck on a problem? Get instant help from our community and mentors.</p>
                            <ul className="text-left w-full space-y-2 mb-8">
                                <li className="flex items-center text-sm text-slate-700 gap-2"><CheckCircle size={16} className="text-emerald-500" /> 24/7 Availability</li>
                                <li className="flex items-center text-sm text-slate-700 gap-2"><CheckCircle size={16} className="text-emerald-500" /> Video Solutions</li>
                                <li className="flex items-center text-sm text-slate-700 gap-2"><CheckCircle size={16} className="text-emerald-500" /> Concept Revision</li>
                            </ul>
                        </div>

                        <div className="bg-amber-50 rounded-3xl p-8 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Performance Analytics</h3>
                            <p className="text-slate-600 mb-6">Data-driven insights to identify your weak areas and improve efficiently.</p>
                            <ul className="text-left w-full space-y-2 mb-8">
                                <li className="flex items-center text-sm text-slate-700 gap-2"><CheckCircle size={16} className="text-amber-500" /> Detailed Reports</li>
                                <li className="flex items-center text-sm text-slate-700 gap-2"><CheckCircle size={16} className="text-amber-500" /> Growth Charts</li>
                                <li className="flex items-center text-sm text-slate-700 gap-2"><CheckCircle size={16} className="text-amber-500" /> Comparative Analysis</li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
