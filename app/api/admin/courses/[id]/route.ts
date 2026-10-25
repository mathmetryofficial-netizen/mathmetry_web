import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        
        const { title, description, subject, classLevel, price, duration } = await req.json();
        const { id } = await params;

        const course = await Course.findByIdAndUpdate(
            id,
            {
                title,
                description,
                subject,
                classLevel,
                price: Number(price),
                duration
            },
            { new: true }
        );

        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Course updated successfully', course });
    } catch (error) {
        console.error('Course update error:', error);
        return NextResponse.json(
            { error: 'Failed to update course' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        
        const { id } = await params;
        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Course delete error:', error);
        return NextResponse.json(
            { error: 'Failed to delete course' },
            { status: 500 }
        );
    }
}