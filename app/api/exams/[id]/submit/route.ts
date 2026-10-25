import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Exam from '@/models/Exam';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const { answers } = await req.json(); // Object { questionId: selectedOptionIndex }

        await dbConnect();
        const exam = await Exam.findById(id);

        if (!exam) {
            return NextResponse.json({ message: 'Exam not found' }, { status: 404 });
        }

        let score = 0;
        const results = exam.questions.map((q: any) => {
            const selectedOption = answers[q._id];
            const isCorrect = selectedOption === q.correctOption;
            if (isCorrect) {
                score += q.marks;
            }
            return {
                questionId: q._id,
                isCorrect,
                correctOption: q.correctOption,
                selectedOption
            };
        });

        return NextResponse.json({ score, totalMarks: exam.totalMarks, results });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error submitting exam' }, { status: 500 });
    }
}
