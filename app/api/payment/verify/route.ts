import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import Subscription from '@/models/Subscription';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            plan,
            amount
        } = await req.json();

        const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!razorpaySecret) {
            console.error('RAZORPAY_KEY_SECRET is not configured');
            return NextResponse.json({ message: 'Payment gateway configuration error' }, { status: 500 });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", razorpaySecret)
            .update(body.toString())
            .digest("hex");

        const expectedSigBuf = Buffer.from(expectedSignature, 'utf-8');
        const incomingSigBuf = Buffer.from(razorpay_signature || '', 'utf-8');

        const isAuthentic =
            expectedSigBuf.length === incomingSigBuf.length &&
            crypto.timingSafeEqual(expectedSigBuf, incomingSigBuf);

        if (isAuthentic) {
            await dbConnect();

            // Calculate end date based on plan
            const startDate = new Date();
            let endDate = new Date(startDate);

            if (plan === 'monthly') endDate.setDate(endDate.getDate() + 30);
            else if (plan === 'quarterly') endDate.setDate(endDate.getDate() + 90);
            else if (plan === 'yearly') endDate.setDate(endDate.getDate() + 365);

            await Subscription.create({
                user: session.user.id,
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                plan,
                amount,
                startDate,
                endDate,
                status: 'active'
            });

            return NextResponse.json({ message: "Payment verified successfully" });
        } else {
            return NextResponse.json(
                { message: "Invalid signature" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
