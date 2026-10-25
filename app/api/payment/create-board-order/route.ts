import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import razorpay from '@/lib/razorpay';

const BOARD_PRICES: Record<string, number> = {
    Foundation: 999,
    ICSE: 999,
    CBSE: 999,
};

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { classLevel, board } = await request.json();

        if (!classLevel || !board) {
            return NextResponse.json({ error: 'Class level and board are required' }, { status: 400 });
        }

        const calculatedAmount = BOARD_PRICES[board] ?? 999;

        console.log('Creating Razorpay order for board access:', { calculatedAmount, classLevel, board });

        const order = await razorpay.orders.create({
            amount: calculatedAmount * 100,
            currency: 'INR',
            receipt: `board_${classLevel}_${board}_${Date.now()}`.slice(0, 40),
        });

        console.log('Order created successfully:', order.id);
        return NextResponse.json(order);
    } catch (error: any) {
        console.error('Create order error:', error);
        console.error('Error details:', error.error || error.message || error);
        return NextResponse.json({ 
            error: 'Failed to create order',
            details: error.error?.description || error.message || 'Unknown error'
        }, { status: 500 });
    }
}
