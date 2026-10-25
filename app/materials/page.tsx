'use client';

import { useState, useEffect } from 'react';
import { useLoading } from '@/components/LoadingProvider';
import Loader from '@/components/Loader';
import { motion } from 'framer-motion';
import { Eye, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Navbar';

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

export default function MaterialsPage() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const { showLoader, hideLoader } = useLoading();

    // Selection State
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

    // Filtered Materials Grouped by Chapter (Step 3)
    const [groupedMaterials, setGroupedMaterials] = useState<Record<string, Material[]>>({});

    useEffect(() => {
        fetchMaterials();
    }, []);

    useEffect(() => {
        if (selectedClass && selectedBoard && materials.length > 0) {
            const filtered = materials.filter(
                m => m.classLevel === selectedClass && m.board === selectedBoard
            );

            // Group by chapter
            const grouped = filtered.reduce((acc, material) => {
                const chapter = material.chapter || 'Uncategorized';
                if (!acc[chapter]) acc[chapter] = [];
                acc[chapter].push(material);
                return acc;
            }, {} as Record<string, Material[]>);

            setGroupedMaterials(grouped);
        }
    }, [selectedClass, selectedBoard, materials]);

    const fetchMaterials = async () => {
        try {
            const response = await fetch('/api/admin/materials');
            if (response.ok) {
                const data = await response.json();
                setMaterials(data.materials);
            }
        } catch (error) {
            console.error('Failed to fetch materials:', error);
        } finally {
            setLoading(false);
        }
    };

    const [hasBoardAccess, setHasBoardAccess] = useState(false);
    const [checkingAccess, setCheckingAccess] = useState(false);

    useEffect(() => {
        if (selectedClass && selectedBoard) {
            checkBoardAccess();
        }
    }, [selectedClass, selectedBoard]);

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

    const handleBoardPurchase = async () => {
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

            // Load Razorpay script
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
                    amount: order.amount,
                    currency: order.currency,
                    name: 'Mathametry',
                    description: `Class ${selectedClass} ${selectedBoard} Board Access`,
                    order_id: order.id,
                    handler: async function (response: any) {
                        // Complete purchase with HMAC signature verification
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
                            alert('Payment successful! You now have access to all materials in this board.');
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
                        color: '#6366f1'
                    }
                };

                const razorpayInstance = new (window as any).Razorpay(options);
                razorpayInstance.open();
            };
        } catch (error) {
            console.error('Purchase error:', error);
            alert('Failed to initiate purchase: ' + error);
            hideLoader();
        }
    };

    const resetSelection = () => {
        setStep(1);
        setSelectedClass(null);
        setSelectedBoard(null);
    };

    const goBack = () => {
        if (step === 3) setStep(2);
        else if (step === 2) setStep(1);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader size="lg" />
                    <div className="text-xl text-gray-600">Loading materials...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F8FC] flex justify-center p-4 md:p-8 font-sans">
            <div className="w-full max-w-[1400px] bg-white rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col min-h-[800px]">

                <Navbar />

                {/* Header & Navigation */}
                <div className="px-6 md:px-12 pt-12 pb-8">
                    <div className="flex items-center gap-4 mb-6">
                        {step > 1 && (
                            <button
                                onClick={goBack}
                                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            </button>
                        )}
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                            {step === 1 && 'Select Class'}
                            {step === 2 && 'Select Board'}
                            {step === 3 && 'Study Materials'}
                        </h1>
                    </div>

                    {/* Breadcrumbs */}
                    {step > 1 && (
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8">
                            <span className={step === 1 ? "text-indigo-600 font-bold" : ""}>Class {selectedClass}</span>
                            <span>/</span>
                            {selectedBoard && (
                                <>
                                    <span className={step === 2 ? "text-indigo-600 font-bold" : ""}>{selectedBoard}</span>
                                    <span>/</span>
                                </>
                            )}
                            {step === 3 && <span className="text-indigo-600 font-bold">Mathematics</span>}
                        </div>
                    )}
                </div>

                {/* Step Content */}
                <section className="px-6 md:px-12 pb-24 flex-1">

                    {/* Step 1: Class Selection */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {['7', '8', '9', '10', '11', '12'].map((cls) => (
                                <motion.div
                                    key={cls}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => {
                                        setSelectedClass(cls);
                                        setStep(2);
                                    }}
                                    className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-[2rem] p-8 aspect-square flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl transition-all"
                                >
                                    <div className="text-6xl font-black mb-2">{cls}</div>
                                    <div className="text-lg font-medium opacity-90">Class</div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Step 2: Board Selection */}
                    {step === 2 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
                            {['Foundation', 'ICSE', 'CBSE'].map((board) => (
                                <motion.div
                                    key={board}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => {
                                        setSelectedBoard(board);
                                        setStep(3);
                                    }}
                                    className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 aspect-[4/3] flex flex-col items-center justify-center cursor-pointer shadow-sm hover:border-indigo-500 hover:shadow-xl transition-all group"
                                >
                                    <div className="text-3xl font-bold text-slate-800 group-hover:text-indigo-600 mb-2">{board}</div>
                                    <div className="text-sm text-slate-500">Board</div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Step 3: Material Display */}
                    {step === 3 && (
                        <div className="max-w-5xl mx-auto space-y-8">
                            {/* Board Access Banner */}
                            {!hasBoardAccess && (
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[2rem] p-8 shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-2">Unlock All Materials</h2>
                                            <p className="text-indigo-100">Get unlimited access to all Class {selectedClass} {selectedBoard} materials</p>
                                        </div>
                                        <button
                                            onClick={handleBoardPurchase}
                                            disabled={checkingAccess}
                                            className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg"
                                        >
                                            Buy Access - ₹999
                                        </button>
                                    </div>
                                </div>
                            )}

                            {hasBoardAccess && (
                                <div className="bg-green-50 border border-green-200 text-green-800 rounded-[2rem] p-6 flex items-center gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                    <span className="font-semibold">You have full access to all materials in this board</span>
                                </div>
                            )}

                            {Object.entries(groupedMaterials).length > 0 ? (
                                Object.entries(groupedMaterials).map(([chapter, items], idx) => (
                                    <motion.div
                                        key={chapter}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden"
                                    >
                                        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
                                            <h2 className="text-xl font-bold text-slate-900">{chapter}</h2>
                                            <p className="text-sm text-slate-500 mt-1">{items.length} Resources</p>
                                        </div>
                                        <div className="p-6 grid gap-4">
                                            {items.map((material) => (
                                                <div key={material._id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                            {material.type === 'pdf' ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect width="15" height="14" x="1" y="5" rx="2" ry="2" /></svg>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-slate-900">{material.title}</h3>
                                                            <p className="text-sm text-slate-500">{material.type} • ₹{material.price}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <a
                                                            href={hasBoardAccess ? `/materials/view/${material._id}` : '#'}
                                                            className={`px-4 py-3 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                                                                hasBoardAccess 
                                                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                            }`}
                                                            onClick={(e) => {
                                                                if (!hasBoardAccess) {
                                                                    e.preventDefault();
                                                                    alert('Please purchase board access to view materials');
                                                                }
                                                            }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                                            {hasBoardAccess ? 'View' : 'Locked'}
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">No materials found</h3>
                                    <p className="text-slate-500 mt-2">Try selecting a different class or board.</p>
                                    <button
                                        onClick={resetSelection}
                                        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700"
                                    >
                                        Start Over
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}