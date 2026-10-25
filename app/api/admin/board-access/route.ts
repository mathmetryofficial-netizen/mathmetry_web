import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import BoardAccess from '@/models/BoardAccess';

export async function GET() {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        
        if (!session?.user || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const boardAccess = await BoardAccess.find()
            .populate('userId', 'name email mobile')
            .sort({ purchasedAt: -1 });

        return NextResponse.json({ boardAccess });
    } catch (error) {
        console.error('Fetch board access error:', error);
        return NextResponse.json({ error: 'Failed to fetch board access' }, { status: 500 });
    }
}
