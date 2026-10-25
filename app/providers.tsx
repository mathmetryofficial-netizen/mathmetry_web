'use client';

import { SessionProvider } from 'next-auth/react';
import { LoadingProvider } from '@/components/LoadingProvider';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider>
                <LoadingProvider>
                    {children}
                </LoadingProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
