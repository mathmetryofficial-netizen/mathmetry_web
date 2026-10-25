import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';

export async function GET() {
    try {
        await dbConnect();
        // Fetch live courses from database
        const courses = await Course.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json({ courses });
    } catch (error) {
        console.error('Failed to fetch public courses:', error);
        return NextResponse.json({ error: 'Failed to fetch courses', courses: [] }, { status: 500 });
    }
}
