import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { NextResponse } from 'next/server';

export async function checkAdminAccess() {
    const session = await getServerSession(authOptions);
    
    // @ts-ignore
    if (!session || session.user?.role !== 'admin') {
        return NextResponse.json(
            { error: 'Unauthorized - Admin access required' },
            { status: 401 }
        );
    }
    
    return null;
}