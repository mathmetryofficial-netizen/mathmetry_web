import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium mb-8 inline-block">
                    ← Back to Home
                </Link>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Welcome to Mathametry. We respect your privacy and are committed to protecting your personal data. 
                            This privacy policy explains how we collect, use, and safeguard your information when you use our 
                            online mathematics learning platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">We collect the following types of information:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Personal Information:</strong> Name, email address, mobile number, class level, school name, and city</li>
                            <li><strong>Payment Information:</strong> Payment transaction details processed through Razorpay (we do not store card details)</li>
                            <li><strong>Usage Data:</strong> Information about how you interact with our platform, including materials accessed and exams taken</li>
                            <li><strong>Device Information:</strong> IP address, browser type, and device information</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">We use your information to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Provide access to study materials, courses, and exams</li>
                            <li>Process payments and manage board access subscriptions</li>
                            <li>Send important updates about your account and services</li>
                            <li>Improve our platform and personalize your learning experience</li>
                            <li>Verify your identity through OTP verification</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal data against 
                            unauthorized access, alteration, disclosure, or destruction. All payment transactions are processed 
                            securely through Razorpay's encrypted payment gateway.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">We do not sell your personal data. We may share your information with:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Payment Processors:</strong> Razorpay for processing payments</li>
                            <li><strong>Service Providers:</strong> Third-party services that help us operate our platform</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Withdraw consent for data processing</li>
                            <li>Object to processing of your data</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We use cookies and similar technologies to enhance your experience, analyze usage, and maintain 
                            your session. You can control cookies through your browser settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our services are intended for students aged 13 and above. If you are under 13, please use our 
                            platform with parental consent and supervision.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Privacy Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update this privacy policy from time to time. We will notify you of any significant changes 
                            by posting the new policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about this privacy policy or our data practices, please contact us at:
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg mt-4">
                            <p className="text-gray-700"><strong>Email:</strong> privacy@mathametry.com</p>
                            <p className="text-gray-700"><strong>Address:</strong> Mathametry Education Services, India</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
