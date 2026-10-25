import Link from "next/link";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function SupportPage() {
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
                        <Link href="/support" className="text-slate-900 font-bold">Support</Link>
                        <Link href="/about" className="hover:text-slate-900 transition">About</Link>
                    </div>
                    <div className="flex-1 flex items-center justify-end">
                        <Link href="/auth/signup" className="px-6 py-2 bg-black text-white rounded-full font-bold text-sm hover:scale-105 transition-transform">
                            Start
                        </Link>
                    </div>
                </nav>

                <main className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center">
                    <div className="text-center max-w-2xl">
                        <h1 className="text-4xl font-bold text-slate-900 mb-6">How can we help you?</h1>
                        <p className="text-lg text-slate-600 mb-12">
                            Our dedicated support team is here to assist you with any questions or issues you might have.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 w-full max-w-4xl">
                        <div className="p-8 border border-slate-200 rounded-2xl flex flex-col items-center hover:bg-slate-50 transition cursor-pointer group">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                                <Mail size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Email Support</h3>
                            <p className="text-slate-500 text-center text-sm">Get response within 24 hours</p>
                            <p className="text-blue-600 font-medium mt-4">support@mathmetry.com</p>
                        </div>

                        <div className="p-8 border border-slate-200 rounded-2xl flex flex-col items-center hover:bg-slate-50 transition cursor-pointer group">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Live Chat</h3>
                            <p className="text-slate-500 text-center text-sm">Instant help during work hours</p>
                            <button className="text-green-600 font-bold mt-4 hover:underline">Start Chat</button>
                        </div>

                        <div className="p-8 border border-slate-200 rounded-2xl flex flex-col items-center hover:bg-slate-50 transition cursor-pointer group">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition">
                                <Phone size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Phone Support</h3>
                            <p className="text-slate-500 text-center text-sm">Mon-Fri, 9am - 6pm</p>
                            <p className="text-purple-600 font-medium mt-4">+1 (800) 123-4567</p>
                        </div>
                    </div>

                    <div className="mt-16 bg-slate-900 text-white p-8 rounded-2xl w-full max-w-4xl flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-1">Frequently Asked Questions</h3>
                            <p className="text-slate-400">Find answers to common questions about subscriptions and courses.</p>
                        </div>
                        <button className="px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition">
                            Visit FAQ
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
