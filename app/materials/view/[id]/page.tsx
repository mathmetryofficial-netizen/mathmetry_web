'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useLoading } from '@/components/LoadingProvider';
import { useSession } from 'next-auth/react';

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

            // Detect Screenshot keys (Cmd+Shift+3/4/5 on Mac, PrtScn on Windows is harder to catch but focus loss handles it mostly)
            if ((e.metaKey && e.shiftKey) || e.key === 'PrintScreen') {
                setIsBlurred(true);
                setTimeout(() => setIsBlurred(false), 2000); // Unblur after 2s
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
        // Extract ID from Google Drive URL
        // Supports: /file/d/ID/view, /open?id=ID
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
        <div className="min-h-screen bg-slate-900 flex flex-col font-sans select-none overflow-hidden">
            {/* Navbar (Dark Mode) */}
            <div className="bg-slate-900 border-b border-slate-800">
                <Navbar />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
                {/* Header */}
                <div className="w-full max-w-6xl flex justify-between items-center mb-4 text-white">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        Back
                    </button>
                    <h1 className="text-lg font-semibold truncate max-w-lg">{title}</h1>
                    <div className="w-16"></div> {/* Spacer */}
                </div>

                {/* Secure Viewer Container */}
                <div className="w-full max-w-6xl h-[80vh] bg-black rounded-xl overflow-hidden shadow-2xl relative border border-slate-800">
                    <div className={`w-full h-full transition-all duration-300 ${isBlurred ? 'blur-xl opacity-50' : ''}`}>
                        {iframeUrl ? (
                            <iframe
                                src={iframeUrl}
                                className="w-full h-full border-0"
                                allow="autoplay"
                                title="Secure Viewer"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500">
                                {status === 'loading' ? 'Checking access...' : 'Loading Viewer...'}
                            </div>
                        )}
                    </div>

                    {/* Mask to hide Google Drive Pop-out button */}
                    <div className="absolute top-0 right-0 w-20 h-16 bg-black z-10 pointer-events-auto"></div>

                    {/* Watermark Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-10 flex flex-col justify-between p-10 select-none">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex justify-between transform -rotate-12 whitespace-nowrap text-white text-3xl font-bold">
                                <span>{session?.user?.email || 'MATHAMETRY'}</span>
                                <span>DO NOT SHAR OR SCREENSHOTE</span>
                                <span>{session?.user?.email || 'MATHAMETRY'}</span>
                            </div>
                        ))}
                    </div>

                    {/* Blur Warning Message */}
                    {isBlurred && (
                        <div className="absolute inset-0 z-30 flex items-center justify-center">
                            <div className="bg-slate-800 text-white px-8 py-4 rounded-xl shadow-2xl text-center border border-slate-700">
                                <h3 className="text-xl font-bold mb-2">Security Alert</h3>
                                <p className="text-slate-400">Content hidden while window is effectively inactive.</p>
                            </div>
                        </div>
                    )}
                </div>

                <p className="mt-4 text-slate-500 text-xs">
                    Protected Content. Downloading and printing is disabled.
                </p>
            </div>
        </div>
    );
}
