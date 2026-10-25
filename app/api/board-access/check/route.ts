import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import BoardAccess from '@/models/BoardAccess';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id) {
            return NextResponse.json({ hasAccess: false }, { status: 401 });
        }

        const { classLevel, board } = await request.json();

        const access = await BoardAccess.findOne({
            userId: session.user.id,
            classLevel,
            board,
            status: 'active'
        }).lean();

        return NextResponse.json({ hasAccess: !!access });
    } catch (error) {
        console.error('Check board access error:', error);
        return NextResponse.json({ hasAccess: false }, { status: 500 });
    }
}
