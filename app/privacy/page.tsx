import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ApplicationFooter from '@/components/ApplicationFooter';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#FFFCFB] text-[#111111] flex flex-col font-sans selection:bg-[#FFF4EC] selection:text-[#DE5815]">
            <Navbar />

            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <Link href="/" className="text-xs font-bold text-[#F36A21] hover:underline mb-6 inline-flex items-center gap-1.5">
                    ← Back to Home
                </Link>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight mb-2">
                    Privacy Policy
                </h1>
                <div className="w-12 h-1 bg-[#F36A21] rounded-full mb-6" />
                <p className="text-xs text-[#858585] mb-12">Last updated: October 2026</p>

                <div className="space-y-10 text-sm leading-relaxed text-[#626262]">
                    <section className="bg-white p-8 rounded-2xl border border-[#EAE5E1] shadow-xs">
                        <h2 className="text-xl font-bold text-[#111111] mb-3">1. Introduction</h2>
                        <p>
                            Welcome to Mathmetry. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy explains how we collect, use, and safeguard your information when you use our
                            online mathematics learning platform.
                        </p>
                    </section>

                    <section className="bg-white p-8 rounded-2xl border border-[#EAE5E1] shadow-xs">
                        <h2 className="text-xl font-bold text-[#111111] mb-3">2. Information We Collect</h2>
                        <p className="mb-3">We collect the following types of information to deliver our educational services:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong className="text-[#111111]">Personal Identification:</strong> Name, email address, mobile number, class level, school name, and city.</li>
                            <li><strong className="text-[#111111]">Payment Data:</strong> Secure transaction records processed via Razorpay (Mathmetry does not store card details or CVVs).</li>
                            <li><strong className="text-[#111111]">Platform Activity:</strong> Chapters opened, exam scores, and session timestamps.</li>
                            <li><strong className="text-[#111111]">Device & Security Data:</strong> IP address and browser signatures utilized to generate personalized security watermarks.</li>
                        </ul>
                    </section>

                    <section className="bg-white p-8 rounded-2xl border border-[#EAE5E1] shadow-xs">
                        <h2 className="text-xl font-bold text-[#111111] mb-3">3. How We Use Your Information</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Provision of chapter notes, formula sheets, and timed assessments.</li>
                            <li>Processing board access purchases and granting immediate entitlements.</li>
                            <li>Preventing unauthorized redistribution through digital watermarking.</li>
                            <li>Account verification and security authentication.</li>
                        </ul>
                    </section>

                    <section className="bg-white p-8 rounded-2xl border border-[#EAE5E1] shadow-xs">
                        <h2 className="text-xl font-bold text-[#111111] mb-3">4. Data Security</h2>
                        <p>
                            We implement strict technical and organizational protocols to protect your personal information against unauthorized access,
                            alteration, disclosure, or destruction. All payments are encrypted and processed through Razorpay's PCI-DSS compliant infrastructure.
                        </p>
                    </section>

                    <section className="bg-white p-8 rounded-2xl border border-[#EAE5E1] shadow-xs">
                        <h2 className="text-xl font-bold text-[#111111] mb-3">5. Contact Information</h2>
                        <p>
                            If you have questions regarding our privacy practices or wish to update your profile data, please contact us at{' '}
                            <a href="mailto:mathmetry.official@gmail.com" className="font-bold text-[#F36A21] hover:underline">
                                mathmetry.official@gmail.com
                            </a>.
                        </p>
                    </section>
                </div>
            </main>

            <ApplicationFooter />
        </div>
    );
}
