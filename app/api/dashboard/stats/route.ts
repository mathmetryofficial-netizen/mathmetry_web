import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Material from '@/models/Material';
import Exam from '@/models/Exam';
import Course from '@/models/Course';
import BoardAccess from '@/models/BoardAccess';

export async function GET() {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get counts
        const materialsCount = await Material.countDocuments();
        const examsCount = await Exam.countDocuments();
        const coursesCount = await Course.countDocuments();

        // Get user's board access
        const userBoardAccess = await BoardAccess.find({ 
            userId: session.user.id,
            status: 'active'
        }).lean();

        // Get materials from purchased boards using $in operator
        let recentMaterials: { _id: string; title: string; subject: string; createdAt: Date; fileUrl: string | null | undefined }[] = [];
        if (userBoardAccess.length > 0) {
            const boardFilters = userBoardAccess.map(access => ({
                classLevel: access.classLevel,
                board: access.board
            }));

            const materials = await Material.find({
                $or: boardFilters
            })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title subject createdAt fileUrl')
            .lean();

            recentMaterials = materials.map(material => ({
                _id: material._id.toString(),
                title: material.title,
                subject: material.subject,
                createdAt: material.createdAt,
                fileUrl: material.fileUrl
            }));
        }

        // Get recent exams (last 3)
        const recentExams = await Exam.find()
            .sort({ createdAt: -1 })
            .limit(3)
            .select('title subject totalMarks');

        return NextResponse.json({
            materialsCount,
            examsCount,
            coursesCount,
            recentMaterials,
            recentExams
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard stats' },
            { status: 500 }
        );
    }
}