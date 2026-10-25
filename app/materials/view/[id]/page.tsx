'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useLoading } from '@/components/LoadingProvider';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Shield, Lock } from 'lucide-react';

export default function SecureViewerPage() {
    const params = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [iframeUrl, setIframeUrl] = useState('');
    const [title, setTitle] = useState('');
    const [isBlurred, setIsBlurred] = useState(false);
    const { showLoader, hideLoader } = useLoading();

    useEffect(() => {
        const fetchMaterial = async () => {
            if (status === 'loading') return;

            if (status === 'unauthenticated') {
                router.push('/auth/login?redirect=/materials/view/' + params.id);
                return;
            }

            showLoader();
            try {
                const response = await fetch(`/api/materials/${params.id}`);
                if (response.ok) {
                    const data = await response.json();

                    if (data.hasAccess) {
                        setTitle(data.material.title);
                        const embedUrl = getDriveEmbedUrl(data.material.fileUrl || data.material.previewUrl);
                        setIframeUrl(embedUrl);
                    } else {
                        alert('You need to purchase board access to view this material.');
                        router.push('/materials');
                    }
                } else if (response.status === 404) {
                    alert('Material not found');
                    router.push('/materials');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                hideLoader();
            }
        };

        if (params.id) {
            fetchMaterial();
        }

        // Disable right click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);

        // Anti-Screenshot: Blur on focus loss
        const handleBlur = () => setIsBlurred(true);
        const handleFocus = () => setIsBlurred(false);
        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);

        // Disable keyboard shortcuts & Detect screenshot keys
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent Print/Save
            if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
                e.preventDefault();
            }

            // Detect Screenshot keys (Cmd+Shift+3/4/5 on Mac, PrintScreen on Windows)
            if ((e.metaKey && e.shiftKey) || e.key === 'PrintScreen') {
                setIsBlurred(true);
                setTimeout(() => setIsBlurred(false), 2000);
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
        };
    }, [params.id, status, session]);

    const getDriveEmbedUrl = (url: string) => {
        if (!url) return '';
        let id = '';
        const regex1 = /\/file\/d\/([a-zA-Z0-9_-]+)/;
        const regex2 = /id=([a-zA-Z0-9_-]+)/;

        const match1 = url.match(regex1);
        const match2 = url.match(regex2);

        if (match1) id = match1[1];
        else if (match2) id = match2[1];

        if (id) {
            return `https://drive.google.com/file/d/${id}/preview`;
        }
        return url;
    };

    return (
        <div className="min-h-screen bg-[#111111] flex flex-col font-sans select-none overflow-hidden">
            {/* Header */}
            <div className="bg-[#1A1A1A] border-b border-[#2A2A2A] px-3 sm:px-6 py-2 sm:py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
                    <button
                        onClick={() => router.back()}
                        className="min-h-[44px] inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#A0A0A0] hover:text-white transition-colors cursor-pointer shrink-0"
                    >
                        <ArrowLeft size={16} />
                        <span className="hidden sm:inline">Back to Materials</span>
                        <span className="sm:hidden">Back</span>
                    </button>
                    <div className="flex items-center gap-2 max-w-[180px] sm:max-w-md truncate">
                        <span className="w-2 h-2 rounded-full bg-[#F36A21] shrink-0"></span>
                        <h1 className="text-xs sm:text-sm font-semibold text-white truncate">{title || 'Material Viewer'}</h1>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-[#2A2A2A] text-[10px] sm:text-[11px] text-[#A0A0A0] shrink-0">
                        <Shield size={12} className="text-[#F36A21]" />
                        <span className="hidden sm:inline">Protected View</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 relative">
                {/* Secure Viewer Container */}
                <div className="w-full max-w-6xl h-[84vh] bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-[#2A2A2A]">
                    <div className={`w-full h-full transition-all duration-300 ${isBlurred ? 'blur-xl opacity-40' : ''}`}>
                        {iframeUrl ? (
                            <iframe
                                src={iframeUrl}
                                className="w-full h-full border-0"
                                allow="autoplay"
                                title="Secure Viewer"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#858585] text-sm">
                                {status === 'loading' ? 'Verifying board access...' : 'Loading document...'}
                            </div>
                        )}
                    </div>

                    {/* Mask to prevent popout window opening */}
                    <div className="absolute top-0 right-0 w-24 h-16 bg-black z-10 pointer-events-auto"></div>

                    {/* Dynamic Watermark Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-10 flex flex-col justify-between p-10 select-none">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex justify-between transform -rotate-12 whitespace-nowrap text-white text-2xl font-bold tracking-wider">
                                <span>{session?.user?.email || 'MATHMETRY ENCRYPTED'}</span>
                                <span>CONFIDENTIAL • DO NOT SHARE OR SCREENSHOT</span>
                                <span>{session?.user?.email || 'MATHMETRY ENCRYPTED'}</span>
                            </div>
                        ))}
                    </div>

                    {/* Security Blur Alert */}
                    {isBlurred && (
                        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-md">
                            <div className="bg-[#1A1A1A] text-white px-8 py-6 rounded-2xl shadow-2xl text-center border border-[#333333] max-w-sm">
                                <div className="w-10 h-10 rounded-full bg-[#FFF4EC] text-[#F36A21] flex items-center justify-center mx-auto mb-3">
                                    <Lock size={18} />
                                </div>
                                <h3 className="text-base font-bold mb-1">Viewer Paused</h3>
                                <p className="text-xs text-[#858585]">
                                    Content is automatically shielded while focus is outside the browser window.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <p className="mt-3 text-[#626262] text-xs">
                    Protected Mathmetry Academic Content • Printing and saving disabled
                </p>
            </div>
        </div>
    );
}
