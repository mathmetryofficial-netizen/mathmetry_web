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

        // Run initial independent queries in parallel
        const [materialsCount, examsCount, coursesCount, userBoardAccess, recentExams] = await Promise.all([
            Material.countDocuments(),
            Exam.countDocuments(),
            Course.countDocuments(),
            BoardAccess.find({ 
                userId: session.user.id,
                status: 'active'
            }).lean(),
            Exam.find()
                .sort({ createdAt: -1 })
                .limit(3)
                .select('title subject totalMarks')
                .lean()
        ]);

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