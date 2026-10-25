import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
    try {
        await dbConnect();
        
        const users = await User.find()
            .select('name email role createdAt')
            .sort({ createdAt: -1 })
            .lean();
        
        return NextResponse.json({ users });
    } catch (error) {
        console.error('Users fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}