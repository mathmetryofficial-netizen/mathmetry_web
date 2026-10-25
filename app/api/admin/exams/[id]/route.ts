import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Exam from '@/models/Exam';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        
        const { title, description, subject, classLevel, durationMinutes, totalMarks, questions } = await req.json();
        const { id } = await params;

        const exam = await Exam.findByIdAndUpdate(
            id,
            {
                title,
                description,
                subject,
                classLevel,
                durationMinutes,
                totalMarks,
                questions
            },
            { new: true }
        );

        if (!exam) {
            return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Exam updated successfully', exam });
    } catch (error) {
        console.error('Exam update error:', error);
        return NextResponse.json(
            { error: 'Failed to update exam' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        
        const { id } = await params;
        const exam = await Exam.findByIdAndDelete(id);

        if (!exam) {
            return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Exam deleted successfully' });
    } catch (error) {
        console.error('Exam delete error:', error);
        return NextResponse.json(
            { error: 'Failed to delete exam' },
            { status: 500 }
        );
    }
}