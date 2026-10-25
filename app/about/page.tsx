import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
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
                        <Link href="/services" className="hover:text-slate-900 transition">Services</Link>
                        <Link href="/support" className="hover:text-slate-900 transition">Support</Link>
                        <Link href="/about" className="text-slate-900 font-bold">About</Link>
                    </div>
                    <div className="flex-1 flex items-center justify-end">
                        <Link href="/auth/signup" className="px-6 py-2 bg-black text-white rounded-full font-bold text-sm hover:scale-105 transition-transform">
                            Start
                        </Link>
                    </div>
                </nav>

                <main className="flex-1 p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h1 className="text-5xl font-extrabold text-slate-900 mb-6">Empowering the Next Generation of Mathematicians</h1>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                Mathmetry was founded with a single mission: to make high-quality mathematics education accessible, engaging, and effective for everyone.
                            </p>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                We believe that math is not just about numbers; it's about critical thinking, problem-solving, and understanding the world around us. Our platform combines cutting-edge technology with expert pedagogy to create a learning experience like no other.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-indigo-600">10k+</span>
                                    <span className="text-slate-500">Students</span>
                                </div>
                                <div className="w-px bg-slate-200"></div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-indigo-600">500+</span>
                                    <span className="text-slate-500">Lessons</span>
                                </div>
                                <div className="w-px bg-slate-200"></div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-indigo-600">4.9/5</span>
                                    <span className="text-slate-500">Rating</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[500px] bg-slate-100 rounded-[2.5rem] overflow-hidden">
                            {/* Placeholder for About Image */}
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                About Illustration / Team Photo
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-6">
                        <div className="bg-slate-50 p-8 rounded-2xl">
                            <h3 className="font-bold text-xl text-slate-900 mb-3">Excellence</h3>
                            <p className="text-slate-600">We strive for the highest quality in everything we teach and build.</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-2xl">
                            <h3 className="font-bold text-xl text-slate-900 mb-3">Innovation</h3>
                            <p className="text-slate-600">Using technology to make learning smarter, faster, and more fun.</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-2xl">
                            <h3 className="font-bold text-xl text-slate-900 mb-3">Community</h3>
                            <p className="text-slate-600">Building a supportive environment where every student can thrive.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
