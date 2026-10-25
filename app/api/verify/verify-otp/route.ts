import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const { mobile, otp } = await req.json();

        if (!mobile || !otp) {
            return NextResponse.json(
                { message: 'Please provide mobile number and OTP' },
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await User.findOne({ mobile }).select('+otp +otpExpiry');

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        if (!user.otp || !user.otpExpiry) {
            return NextResponse.json(
                { message: 'No OTP found. Please request a new one' },
                { status: 400 }
            );
        }

        if (new Date() > user.otpExpiry) {
            return NextResponse.json(
                { message: 'OTP expired. Please request a new one' },
                { status: 400 }
            );
        }

        if (user.otp !== otp) {
            return NextResponse.json(
                { message: 'Invalid OTP' },
                { status: 400 }
            );
        }

        user.mobileVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        return NextResponse.json(
            { message: 'Mobile verified successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to verify OTP' },
            { status: 500 }
        );
    }
}