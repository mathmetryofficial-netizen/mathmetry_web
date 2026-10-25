'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, Eye, ArrowRight } from 'lucide-react';
import Loader from '@/components/Loader';

interface Material {
    _id: string;
    title: string;
    subject: string;
    type: 'pdf' | 'text' | 'video_link';
    classLevel: string;
    fileUrl?: string;
    content?: string;
    createdAt: string;
}

export default function DashboardMaterialsPage() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/materials')
            .then((res) => res.json())
            .then((data) => {
                const list = Array.isArray(data) ? data : (data.materials || []);
                setMaterials(list);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <Loader size="md" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F36A21] bg-[#FFF4EC] border border-[#F36A21]/20 px-3 py-1 rounded-full inline-block mb-2">
                        Resource Library
                    </span>
                    <h1 className="text-3xl font-extrabold text-[#111111] tracking-tight">Study Materials</h1>
                    <div className="w-10 h-1 bg-[#F36A21] rounded-full mt-2 mb-2" />
                    <p className="text-xs sm:text-sm text-[#626262]">Browse unlocked board modules, formula sheets, and chapter notes.</p>
                </div>

                <Link
                    href="/materials"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] hover:bg-[#F36A21] text-white rounded-full text-xs font-bold transition-colors self-start shadow-xs"
                >
                    <span>Full Chapter Catalog</span>
                    <ArrowRight size={14} />
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {materials.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white border border-[#EAE5E1] rounded-2xl p-6 shadow-xs hover:border-[#F36A21]/40 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F36A21] bg-[#FFF4EC] border border-[#F36A21]/20 px-2.5 py-0.5 rounded-full">
                                    {item.type}
                                </span>
                                <span className="text-xs text-[#858585]">
                                    {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-[#111111] mb-1 leading-snug line-clamp-2">
                                {item.title}
                            </h3>
                            <p className="text-xs text-[#626262] mb-6">
                                {item.subject} • {item.classLevel}
                            </p>
                        </div>

                        <Link
                            href={`/materials/view/${item._id}`}
                            className="w-full py-2.5 px-4 bg-[#F9F5F1] hover:bg-[#111111] text-[#111111] hover:text-white rounded-full text-xs font-bold border border-[#EAE5E1] flex items-center justify-center gap-1.5 transition-all"
                        >
                            <Eye size={13} />
                            <span>Open In Secure Viewer</span>
                        </Link>
                    </div>
                ))}

                {materials.length === 0 && (
                    <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-[#EAE5E1] p-8">
                        <BookOpen size={24} className="text-[#858585] mx-auto mb-3" />
                        <h3 className="text-sm font-bold text-[#111111]">No Materials Available</h3>
                        <p className="text-xs text-[#626262] mt-1 mb-5">Select your board to unlock chapter materials.</p>
                        <Link
                            href="/materials"
                            className="px-6 py-2.5 bg-[#F36A21] hover:bg-[#DE5815] text-white rounded-full text-xs font-bold transition-colors"
                        >
                            Explore Boards
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
