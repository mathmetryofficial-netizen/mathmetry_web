import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import BoardAccess from '@/models/BoardAccess';
import crypto from 'crypto';

// Canonical server-side price map (prevents client-side price tampering)
const BOARD_PRICES: Record<string, number> = {
    Foundation: 999,
    ICSE: 999,
    CBSE: 999,
};

function getBoardPrice(board: string): number {
    return BOARD_PRICES[board] ?? 999;
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { classLevel, board } = body;
        
        // Support both standard and Razorpay response naming conventions
        const orderId = body.orderId || body.razorpay_order_id;
        const paymentId = body.paymentId || body.razorpay_payment_id;
        const signature = body.signature || body.razorpay_signature;

        if (!classLevel || !board) {
            return NextResponse.json(
                { error: 'Class level and board are required' },
                { status: 400 }
            );
        }

        const allowedBoards = ['Foundation', 'ICSE', 'CBSE'];
        if (!allowedBoards.includes(board)) {
            return NextResponse.json(
                { error: `Invalid board. Allowed boards: ${allowedBoards.join(', ')}` },
                { status: 400 }
            );
        }

        if (!orderId || !paymentId || !signature) {
            return NextResponse.json(
                { error: 'Payment verification failed: orderId, paymentId, and signature are required' },
                { status: 400 }
            );
        }

        // Enforce HMAC SHA256 Signature Verification
        const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!razorpaySecret) {
            console.error('RAZORPAY_KEY_SECRET is not configured in environment variables');
            return NextResponse.json(
                { error: 'Payment gateway configuration error' },
                { status: 500 }
            );
        }

        const payload = `${orderId}|${paymentId}`;
        const generatedSignature = crypto
            .createHmac('sha256', razorpaySecret)
            .update(payload)
            .digest('hex');

        const expectedSigBuf = Buffer.from(generatedSignature, 'utf-8');
        const incomingSigBuf = Buffer.from(signature, 'utf-8');

        const isAuthentic = 
            expectedSigBuf.length === incomingSigBuf.length &&
            crypto.timingSafeEqual(expectedSigBuf, incomingSigBuf);

        if (!isAuthentic) {
            console.warn(`Payment signature mismatch for orderId: ${orderId}, paymentId: ${paymentId}`);
            return NextResponse.json(
                { error: 'Invalid payment signature. Payment verification failed.' },
                { status: 400 }
            );
        }

        // Prevent replay attacks using the same paymentId
        const existingPayment = await BoardAccess.findOne({ paymentId });
        if (existingPayment) {
            return NextResponse.json(
                { error: 'Payment ID has already been processed' },
                { status: 400 }
            );
        }

        // Check if user already has active access
        const existingAccess = await BoardAccess.findOne({
            userId: session.user.id,
            classLevel,
            board,
            status: 'active'
        });

        if (existingAccess) {
            return NextResponse.json({ 
                message: 'Already have access', 
                access: existingAccess 
            });
        }

        // Calculate price strictly on the server
        const calculatedAmount = getBoardPrice(board);

        const boardAccess = await BoardAccess.create({
            userId: session.user.id,
            classLevel,
            board,
            amount: calculatedAmount,
            paymentId,
            orderId,
            status: 'active',
            purchasedAt: new Date()
        });

        return NextResponse.json({ 
            message: 'Board access granted', 
            access: boardAccess 
        }, { status: 201 });
    } catch (error) {
        console.error('Board purchase error:', error);
        return NextResponse.json({ error: 'Failed to grant board access' }, { status: 500 });
    }
}
