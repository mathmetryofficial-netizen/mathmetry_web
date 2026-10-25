import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Exam from '@/models/Exam';

export async function POST(req: Request) {
    try {
        await dbConnect();
        
        const { title, description, subject, classLevel, durationMinutes, totalMarks, questions } = await req.json();

        const exam = await Exam.create({
            title,
            description,
            subject,
            classLevel,
            durationMinutes,
            totalMarks,
            questions,
            createdBy: '507f1f77bcf86cd799439011' // Placeholder admin ID
        });

        return NextResponse.json({ 
            message: 'Exam created successfully', 
            examId: exam._id 
        });
    } catch (error) {
        console.error('Exam creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create exam' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        
        const exams = await Exam.find().sort({ createdAt: -1 });
        
        return NextResponse.json({ exams });
    } catch (error) {
        console.error('Exams fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch exams' },
            { status: 500 }
        );
    }
}