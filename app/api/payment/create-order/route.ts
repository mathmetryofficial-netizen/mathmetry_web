import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import razorpay from '@/lib/razorpay';
import ShortUniqueId from 'short-unique-id';

const PLAN_PRICES: Record<string, number> = {
    monthly: 499,
    quarterly: 1299,
    yearly: 4999,
};

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { plan } = await req.json();

        if (!plan || !PLAN_PRICES[plan]) {
            return NextResponse.json({ message: 'Invalid or missing subscription plan' }, { status: 400 });
        }

        const calculatedAmount = PLAN_PRICES[plan];

        const options = {
            amount: calculatedAmount * 100, // amount in paise
            currency: "INR",
            receipt: `rcpt_${new ShortUniqueId({ length: 10 }).randomUUID()}`,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
