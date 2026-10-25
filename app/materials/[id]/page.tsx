'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Material {
    _id: string;
    title: string;
    description: string;
    subject: string;
    classLevel: string;
    type: string;
    fileUrl: string;
    price: number;
}

export default function MaterialViewerPage() {
    const params = useParams();
    const [material, setMaterial] = useState<Material | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (params.id) {
            fetchMaterial(params.id as string);
        }
    }, [params.id]);

    const fetchMaterial = async (id: string) => {
        try {
            const response = await fetch(`/api/materials/${id}`);
            if (response.ok) {
                const data = await response.json();
                setMaterial(data.material);
            } else {
                setError('Material not found or access denied');
            }
        } catch (error) {
            console.error('Failed to fetch material:', error);
            setError('Failed to load material');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading material...</div>
            </div>
        );
    }

    if (error || !material) {
        return (
            <div className="min-h-screen bg-white pt-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Material Not Available</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Link
                            href="/dashboard"
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{material.title}</h1>
                                <p className="text-gray-600 text-lg mb-4">{material.description}</p>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full border border-blue-100">
                                        {material.subject}
                                    </span>
                                    <span className="text-sm text-gray-500">{material.classLevel}</span>
                                    <span className="text-sm text-gray-400 uppercase tracking-wide">{material.type}</span>
                                </div>
                            </div>
                            <Link
                                href="/dashboard"
                                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back
                            </Link>
                        </div>
                    </div>

                    {/* Material Content */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Material Content</h2>
                        
                        {material.fileUrl ? (
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Study Material File</h3>
                                                <p className="text-sm text-gray-600">Click to open or download</p>
                                            </div>
                                        </div>
                                        <a
                                            href={material.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Open Material
                                        </a>
                                    </div>
                                </div>

                                {/* Embedded viewer for PDFs */}
                                {material.fileUrl.toLowerCase().includes('.pdf') && (
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <iframe
                                            src={material.fileUrl}
                                            className="w-full h-96 rounded-lg border border-gray-200"
                                            title={material.title}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-500 text-lg">No file available for this material</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}