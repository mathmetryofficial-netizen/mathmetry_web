import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { name, email, password, mobile, classLevel, school, city } = await req.json();

        if (!name || !email || !password || !mobile) {
            return NextResponse.json(
                { message: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            return NextResponse.json(
                { message: 'Please provide a valid 10-digit Indian mobile number' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        await dbConnect();

        const userExists = await User.findOne({ email: email.toLowerCase() });

        if (userExists) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            mobile,
            classLevel: classLevel || '',
            school: school || '',
            city: city || '',
        });

        return NextResponse.json(
            { message: 'User registered successfully', userId: user._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error details:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { message: `Internal Server Error: ${errorMessage}` },
            { status: 500 }
        );
    }
}
