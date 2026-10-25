import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const { mobile } = await req.json();

        if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
            return NextResponse.json(
                { message: 'Please provide a valid mobile number' },
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await User.findOne({ mobile });

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // In production, send OTP via SMS service (Twilio, MSG91, etc.)
        console.log(`OTP for ${mobile}: ${otp}`);

        return NextResponse.json(
            { message: 'OTP sent successfully', otp }, // Remove otp in production
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to send OTP' },
            { status: 500 }
        );
    }
}