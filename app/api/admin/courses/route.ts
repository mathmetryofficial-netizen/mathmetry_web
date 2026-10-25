import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';

export async function POST(req: Request) {
    try {
        await dbConnect();
        
        const { title, description, subject, classLevel, price, duration } = await req.json();

        const course = await Course.create({
            title,
            description,
            subject,
            classLevel,
            price: Number(price),
            duration,
            createdBy: '507f1f77bcf86cd799439011' // Placeholder admin ID
        });

        return NextResponse.json({ 
            message: 'Course created successfully', 
            courseId: course._id 
        });
    } catch (error) {
        console.error('Course creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create course' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        
        const courses = await Course.find().sort({ createdAt: -1 });
        
        return NextResponse.json({ courses });
    } catch (error) {
        console.error('Courses fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch courses' },
            { status: 500 }
        );
    }
}