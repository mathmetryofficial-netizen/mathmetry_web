import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        
        const { role } = await req.json();
        const { id } = await params;

        await User.findByIdAndUpdate(id, { role });
        
        return NextResponse.json({ message: 'User role updated successfully' });
    } catch (error) {
        console.error('User update error:', error);
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}