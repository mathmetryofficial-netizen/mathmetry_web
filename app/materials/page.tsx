'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useLoading } from '@/components/LoadingProvider';
import Loader from '@/components/Loader';
import { motion } from 'framer-motion';
import { Eye, ArrowLeft, BookOpen, Lock, FileText, ChevronRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ApplicationFooter from '@/components/ApplicationFooter';
import AuthPromptModal from '@/components/AuthPromptModal';

interface Material {
    _id: string;
    title: string;
    description: string;
    subject: string;
    classLevel: string;
    board: string;
    chapter: string;
    type: string;
    fileUrl: string;
    previewUrl?: string;
    price: number;
    createdAt: string;
}

function MaterialsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const { showLoader, hideLoader } = useLoading();

    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const [authModalOpen, setAuthModalOpen] = useState(false);

    // Read step state directly from URL search params so browser Back / Forward works naturally
    const classParam = searchParams.get('class');
    const boardParam = searchParams.get('board');

    const selectedClass = classParam || null;
    const selectedBoard = boardParam || null;

    // Determine current step based on URL parameters
    const step: 1 | 2 | 3 = selectedClass && selectedBoard ? 3 : selectedClass ? 2 : 1;

    // Filtered Materials Grouped by Chapter (Step 3)
    const [groupedMaterials, setGroupedMaterials] = useState<Record<string, Material[]>>({});
    const [hasBoardAccess, setHasBoardAccess] = useState(false);
    const [checkingAccess, setCheckingAccess] = useState(false);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await fetch('/api/materials');
            if (response.ok) {
                const data = await response.json();
                const list = Array.isArray(data) ? data : (data.materials || []);
                setMaterials(list);
            }
        } catch (error) {
            console.error('Failed to fetch live materials:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate live counts per class level from database
    const classCounts = materials.reduce((acc, m) => {
        const key = String(m.classLevel || '').replace(/[^0-9]/g, '');
        if (key) acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    useEffect(() => {
        if (selectedClass && selectedBoard && materials.length > 0) {
            const sClassClean = String(selectedClass).replace(/[^0-9]/g, '');

            const filtered = materials.filter(m => {
                const mClassClean = String(m.classLevel || '').replace(/[^0-9]/g, '');
                const mBoardClean = String(m.board || '').toLowerCase();
                return mClassClean === sClassClean && mBoardClean === selectedBoard.toLowerCase();
            });

            // Group by chapter
            const grouped = filtered.reduce((acc, material) => {
                const chapter = material.chapter || 'General Mathematics';
                if (!acc[chapter]) acc[chapter] = [];
                acc[chapter].push(material);
                return acc;
            }, {} as Record<string, Material[]>);

            setGroupedMaterials(grouped);
        } else {
            setGroupedMaterials({});
        }
    }, [selectedClass, selectedBoard, materials]);

    useEffect(() => {
        if (selectedClass && selectedBoard && session) {
            checkBoardAccess();
        } else {
            setHasBoardAccess(false);
        }
    }, [selectedClass, selectedBoard, session]);

    const checkBoardAccess = async () => {
        setCheckingAccess(true);
        try {
            const response = await fetch('/api/board-access/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ classLevel: selectedClass, board: selectedBoard })
            });
            if (response.ok) {
                const data = await response.json();
                setHasBoardAccess(data.hasAccess);
            }
        } catch (error) {
            console.error('Check access error:', error);
        } finally {
            setCheckingAccess(false);
        }
    };

    const handleSelectClass = (cls: string) => {
        router.push(`/materials?class=${encodeURIComponent(cls)}`);
    };

    const handleSelectBoard = (boardName: string) => {
        if (!selectedClass) return;
        router.push(`/materials?class=${encodeURIComponent(selectedClass)}&board=${encodeURIComponent(boardName)}`);
    };

    const goBack = () => {
        if (step === 3 && selectedClass) {
            router.push(`/materials?class=${encodeURIComponent(selectedClass)}`);
        } else if (step === 2) {
            router.push('/materials');
        } else {
            router.push('/');
        }
    };

    const resetSelection = () => {
        router.push('/materials');
    };

    const handleBoardPurchase = async () => {
        // If not logged in, prompt user with signup/login modal
        if (!session) {
            setAuthModalOpen(true);
            return;
        }

        try {
            showLoader();
            const amount = 999;
            
            // Create Razorpay order
            const orderResponse = await fetch('/api/payment/create-board-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, classLevel: selectedClass, board: selectedBoard })
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create order');
            }

            const order = await orderResponse.json();

            // Open Razorpay Checkout
            const openRazorpay = () => {
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
                    amount: order.amount,
                    currency: order.currency,
                    name: 'Mathmetry',
                    description: `Class ${selectedClass} ${selectedBoard} Board Access`,
                    order_id: order.id,
                    handler: async function (response: any) {
                        const purchaseResponse = await fetch('/api/board-access/purchase', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                classLevel: selectedClass,
                                board: selectedBoard,
                                paymentId: response.razorpay_payment_id,
                                orderId: response.razorpay_order_id,
                                signature: response.razorpay_signature,
                            })
                        });

                        if (purchaseResponse.ok) {
                            alert('Payment successful! You now have full access to all materials in this board.');
                            setHasBoardAccess(true);
                        } else {
                            alert('Payment verification failed');
                        }
                        hideLoader();
                    },
                    modal: {
                        ondismiss: function() {
                            hideLoader();
                        }
                    },
                    theme: {
                        color: '#F36A21'
                    }
                };

                const razorpayInstance = new (window as any).Razorpay(options);
                razorpayInstance.open();
            };

            if ((window as any).Razorpay) {
                openRazorpay();
            } else {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                script.onload = openRazorpay;
                document.body.appendChild(script);
            }
        } catch (error) {
            console.error('Purchase error:', error);
            alert('Failed to initiate purchase: ' + error);
            hideLoader();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFFCFB] flex items-center justify-center">
                <Loader size="md" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFCFB] text-[#111111] flex flex-col font-sans selection:bg-[#FFF4EC] selection:text-[#DE5815]">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header & Breadcrumbs with Natural Back Support */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        {step > 1 && (
                            <button
                                onClick={goBack}
                                className="p-2 rounded-full border border-[#EAE5E1] bg-white hover:bg-[#F9F5F1] transition-colors cursor-pointer"
                                aria-label="Go back to previous step"
                            >
                                <ArrowLeft size={18} className="text-[#111111]" />
                            </button>
                        )}
                        <div>
                            {/* Premium Capital Eyebrow — No capsule badge */}
                            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#F36A21] block">
                                STEP 0{step} OF 03
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mt-1.5">
                                {step === 1 && 'Select Your Academic Class'}
                                {step === 2 && `Select Board for Class ${selectedClass}`}
                                {step === 3 && `Class ${selectedClass} • ${selectedBoard} Mathematics`}
                            </h1>
                        </div>
                    </div>

                    {/* Step progress trail */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#858585] pt-1">
                        <button 
                            type="button"
                            onClick={() => router.push('/materials')}
                            className={`hover:underline cursor-pointer ${step >= 1 ? "text-[#F36A21]" : ""}`}
                        >
                            01. Choose Class
                        </button>
                        <span>•</span>
                        <button 
                            type="button"
                            disabled={!selectedClass}
                            onClick={() => selectedClass && router.push(`/materials?class=${encodeURIComponent(selectedClass)}`)}
                            className={`hover:underline disabled:cursor-default ${step >= 2 ? "text-[#F36A21]" : ""}`}
                        >
                            02. Choose Board
                        </button>
                        <span>•</span>
                        <span className={step === 3 ? "text-[#F36A21]" : ""}>03. Study Materials</span>
                    </div>
                </div>

                {/* Step 1: Class Selection */}
                {step === 1 && (
                    <div>
                        <div className="mb-8 max-w-xl">
                            <p className="text-[#626262] text-sm sm:text-base leading-relaxed">
                                Select your grade level to browse chapter summaries, formula sheets, and past examination papers.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {['7', '8', '9', '10', '11', '12'].map((cls) => {
                                const count = classCounts[cls] || 0;
                                return (
                                    <motion.div
                                        key={cls}
                                        whileHover={{ y: -4 }}
                                        onClick={() => handleSelectClass(cls)}
                                        className="bg-white border border-[#EAE5E1] hover:border-[#F36A21] rounded-2xl p-6 text-center cursor-pointer transition-all shadow-xs hover:shadow-md group flex flex-col items-center justify-center aspect-square"
                                    >
                                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#858585] group-hover:text-[#F36A21]">
                                            GRADE
                                        </span>
                                        <div className="text-4xl sm:text-5xl font-black text-[#111111] my-1 group-hover:text-[#F36A21] transition-colors">
                                            {cls}
                                        </div>
                                        <span className="text-[11px] font-semibold text-[#626262]">
                                            {count > 0 ? (
                                                <span className="text-[#F36A21]">{count} Live {count === 1 ? 'Module' : 'Modules'}</span>
                                            ) : (
                                                <span>Mathematics</span>
                                            )}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step 2: Board Selection */}
                {step === 2 && (
                    <div>
                        <div className="mb-8 max-w-xl">
                            <p className="text-[#626262] text-sm sm:text-base leading-relaxed">
                                Select your board curriculum for Class {selectedClass} to view strictly aligned chapter materials.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                            {[
                                { name: 'Foundation', badge: 'Classes 7–10', desc: 'Core fundamentals in arithmetic, algebra, and geometry.' },
                                { name: 'ICSE', badge: 'CISCE Syllabus', desc: 'Commercial math, coordinate geometry, step-by-step theorem proofs.' },
                                { name: 'CBSE', badge: 'NCERT Aligned', desc: 'NCERT exemplar questions, assertion-reason bank, and board patterns.' }
                            ].map((b) => {
                                const sClassClean = String(selectedClass).replace(/[^0-9]/g, '');
                                const boardCount = materials.filter(m => {
                                    const mClassClean = String(m.classLevel || '').replace(/[^0-9]/g, '');
                                    const mBoardClean = String(m.board || '').toLowerCase();
                                    return mClassClean === sClassClean && mBoardClean === b.name.toLowerCase();
                                }).length;

                                return (
                                    <motion.div
                                        key={b.name}
                                        whileHover={{ y: -4 }}
                                        onClick={() => handleSelectBoard(b.name)}
                                        className="bg-white border border-[#EAE5E1] hover:border-[#F36A21] rounded-2xl p-7 cursor-pointer transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
                                    >
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F36A21] block mb-3">
                                                {b.badge}
                                            </span>
                                            <h3 className="text-2xl font-bold text-[#111111] group-hover:text-[#F36A21] transition-colors mb-2">
                                                {b.name} Board
                                            </h3>
                                            <p className="text-xs text-[#626262] leading-relaxed mb-6">
                                                {b.desc}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between text-xs font-bold text-[#111111] pt-4 border-t border-[#F0EBE7]">
                                            <span className="text-[#F36A21]">
                                                {boardCount} Live {boardCount === 1 ? 'Resource' : 'Resources'}
                                            </span>
                                            <ChevronRight size={16} className="text-[#F36A21]" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step 3: Material Display — Live Data Only */}
                {step === 3 && (
                    <div className="space-y-8">
                        {/* Board Access Banner */}
                        {!hasBoardAccess && (
                            <div className="bg-[#FFF4EC] border border-[#F36A21]/30 rounded-3xl p-6 sm:p-8 shadow-xs">
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                    <div>
                                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F36A21] mb-2">
                                            <Sparkles size={14} />
                                            BOARD ACCESS PASS
                                        </div>
                                        <h2 className="text-2xl font-bold text-[#111111] mb-1">
                                            Unlock Class {selectedClass} {selectedBoard} Materials
                                        </h2>
                                        <p className="text-sm text-[#626262]">
                                            One-time ₹999 payment gives you unrestricted access to all chapter notes and formula sheets for this board.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleBoardPurchase}
                                        disabled={checkingAccess}
                                        className="w-full md:w-auto shrink-0 px-8 py-3.5 bg-[#F36A21] hover:bg-[#DE5815] text-white rounded-full font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-center min-h-[44px]"
                                    >
                                        Buy Board Access — ₹999
                                    </button>
                                </div>
                            </div>
                        )}

                        {hasBoardAccess && (
                            <div className="bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] rounded-2xl p-4 sm:p-5 flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                                    ✓
                                </div>
                                <span className="font-semibold text-sm">
                                    Full Access Active: You have unrestricted access to all Class {selectedClass} {selectedBoard} materials.
                                </span>
                            </div>
                        )}

                        {Object.entries(groupedMaterials).length > 0 ? (
                            <div className="space-y-6">
                                {Object.entries(groupedMaterials).map(([chapter, items]) => (
                                    <div
                                        key={chapter}
                                        className="bg-white rounded-2xl border border-[#EAE5E1] shadow-xs overflow-hidden"
                                    >
                                        <div className="bg-[#F9F5F1] px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#EAE5E1] flex items-center justify-between">
                                            <div>
                                                <h2 className="text-sm sm:text-base font-bold text-[#111111]">{chapter}</h2>
                                                <p className="text-xs text-[#858585] mt-0.5">{items.length} {items.length === 1 ? 'Live Resource' : 'Live Resources'}</p>
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#626262]">
                                                CHAPTER NOTES
                                            </span>
                                        </div>

                                        <div className="divide-y divide-[#F0EBE7]">
                                            {items.map((material) => (
                                                <div
                                                    key={material._id}
                                                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FFFCFB] transition-colors"
                                                >
                                                    <div className="flex items-start gap-3.5">
                                                        <div className="w-10 h-10 rounded-xl bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center shrink-0 mt-0.5">
                                                            <FileText size={20} />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-sm font-bold text-[#111111]">{material.title}</h3>
                                                            {material.description && (
                                                                <p className="text-xs text-[#626262] mt-0.5 max-w-xl">{material.description}</p>
                                                            )}
                                                            <div className="flex items-center gap-3 text-[11px] text-[#858585] mt-1">
                                                                <span className="uppercase font-semibold text-[#111111]">{material.type}</span>
                                                                <span>•</span>
                                                                <span>Included in Board Pass</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 sm:self-center w-full sm:w-auto">
                                                        {hasBoardAccess ? (
                                                            <a
                                                                href={`/materials/view/${material._id}`}
                                                                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#111111] hover:bg-[#F36A21] text-white rounded-full font-semibold text-xs transition-colors shadow-xs min-h-[44px]"
                                                            >
                                                                <Eye size={14} />
                                                                <span>Open Document</span>
                                                            </a>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={handleBoardPurchase}
                                                                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#F9F5F1] text-[#858585] border border-[#EAE5E1] rounded-full font-medium text-xs cursor-pointer hover:bg-[#FFF4EC] hover:text-[#F36A21] transition-colors min-h-[44px]"
                                                            >
                                                                <Lock size={13} />
                                                                <span>Locked • Pass Required</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Live Database Empty State — When 0 materials exist for this class & board */
                            <div className="text-center py-16 bg-white border border-[#EAE5E1] rounded-3xl p-8 max-w-xl mx-auto">
                                <div className="w-14 h-14 bg-[#FFF4EC] text-[#F36A21] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
                                    <BookOpen size={24} />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F36A21] block mb-2">
                                    LIVE INVENTORY
                                </span>
                                <h3 className="text-xl font-bold text-[#111111]">
                                    No Materials Uploaded for Class {selectedClass} {selectedBoard}
                                </h3>
                                <p className="text-xs sm:text-sm text-[#626262] mt-2 max-w-md mx-auto leading-relaxed">
                                    Resources for Class {selectedClass} ({selectedBoard} Board) will appear here once published. In the meantime, you can explore materials for other grades.
                                </p>
                                <button
                                    type="button"
                                    onClick={resetSelection}
                                    className="mt-6 px-7 py-3 bg-[#111111] hover:bg-[#F36A21] text-white rounded-full text-xs font-bold transition-colors cursor-pointer shadow-xs"
                                >
                                    Select Another Class
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <ApplicationFooter />

            {/* Auth Verification Popup */}
            <AuthPromptModal
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                title="Account Required to Unlock"
                description={`To purchase the Class ${selectedClass || ''} ${selectedBoard || ''} Board Pass and access watermarked chapter notes, please sign in or register.`}
                itemName={`Class ${selectedClass} ${selectedBoard} Lifetime Pass`}
                price={999}
                callbackUrl={`/materials?class=${selectedClass || ''}&board=${selectedBoard || ''}`}
            />
        </div>
    );
}

export default function MaterialsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#FFFCFB] flex items-center justify-center">
                <Loader size="md" />
            </div>
        }>
            <MaterialsContent />
        </Suspense>
    );
}