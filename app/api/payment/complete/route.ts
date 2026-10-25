import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Purchase from '@/models/Purchase';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { materialId, amount, paymentId, orderId } = await req.json();

        // Create purchase record
        const purchase = await Purchase.create({
            userId: session.user.id,
            materialId,
            amount,
            paymentId,
            orderId,
            status: 'completed'
        });

        return NextResponse.json({ 
            message: 'Purchase completed successfully',
            purchaseId: purchase._id 
        });
    } catch (error) {
        console.error('Purchase completion error:', error);
        return NextResponse.json(
            { error: 'Failed to complete purchase' },
            { status: 500 }
        );
    }
}