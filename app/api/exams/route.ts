import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Exam from '@/models/Exam';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const exams = await Exam.find({ isPublished: true })
            .select('title subject duration totalMarks isPublished createdAt')
            .sort({ createdAt: -1 })
            .lean();
        return NextResponse.json(exams);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching exams' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const body = await req.json();

        await dbConnect();

        const exam = await Exam.create({
            ...body,
            createdBy: session.user.id
        });

        return NextResponse.json(exam, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error creating exam' }, { status: 500 });
    }
}
