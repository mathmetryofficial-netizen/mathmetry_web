import Link from 'next/link';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium mb-8 inline-block">
                    ← Back to Home
                </Link>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancellation & Refund Policy</h1>
                <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Overview</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Mathametry provides digital educational services including online study materials, courses, and 
                            exam access. This policy outlines our cancellation and refund terms for board access purchases.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Nature of Service</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our platform offers <strong>digital services</strong> that provide immediate access to educational 
                            content upon successful payment. Once you purchase board access, you gain instant access to all 
                            materials for that specific class and board combination.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. No Refund Policy</h2>
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-4">
                            <p className="text-red-900 font-semibold text-lg">
                                All sales are final. We do not offer refunds for board access purchases.
                            </p>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Due to the nature of our digital services, we maintain a strict no-refund policy for the following reasons:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Instant access to digital content is provided immediately upon payment</li>
                            <li>Content cannot be "returned" once accessed</li>
                            <li>Digital materials can be downloaded or viewed instantly</li>
                            <li>Prevention of misuse of educational content</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. What You're Purchasing</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">When you purchase board access, you receive:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Unlimited access to all study materials for the selected class and board</li>
                            <li>Access to all chapters and topics within that board</li>
                            <li>Ability to view materials online through our secure platform</li>
                            <li>Access remains active as per the subscription terms</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cancellation Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            You may cancel your subscription at any time, but no refund will be provided for the remaining 
                            period. Your access will continue until the end of the current subscription period.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Exceptions</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Refunds may be considered only in the following exceptional circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Duplicate Payment:</strong> If you were charged multiple times for the same purchase due to a technical error</li>
                            <li><strong>Technical Issues:</strong> If our platform fails to provide access due to technical problems on our end, and we cannot resolve the issue within 7 days</li>
                            <li><strong>Unauthorized Transaction:</strong> If you can prove that the transaction was unauthorized</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            All exception requests must be submitted within 48 hours of the transaction with supporting evidence.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Payment Issues</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If your payment was deducted but access was not granted, please contact us immediately at 
                            support@mathametry.com with your transaction details. We will investigate and resolve the issue 
                            within 24-48 hours.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Before You Purchase</h2>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                            <p className="text-blue-900 leading-relaxed">
                                <strong>Important:</strong> Please carefully review the class, board, and materials before 
                                making a purchase. Ensure you are selecting the correct board access for your needs. Once 
                                purchased, the transaction cannot be reversed.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any concerns about your purchase, please contact our support team first. We are 
                            committed to resolving issues fairly and promptly. For payment disputes, you may also contact 
                            your payment provider or bank.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed">
                            For any questions regarding this policy or to report payment issues, please contact us:
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg mt-4">
                            <p className="text-gray-700"><strong>Email:</strong> support@mathametry.com</p>
                            <p className="text-gray-700"><strong>Response Time:</strong> Within 24-48 hours</p>
                            <p className="text-gray-700"><strong>Address:</strong> Mathametry Education Services, India</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Policy Updates</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We reserve the right to modify this cancellation and refund policy at any time. Changes will be 
                            effective immediately upon posting on this page. Your continued use of our services after changes 
                            constitutes acceptance of the updated policy.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
