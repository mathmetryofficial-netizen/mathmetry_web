import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Material from '@/models/Material';
import Exam from '@/models/Exam';
import BoardAccess from '@/models/BoardAccess';
import Course from '@/models/Course';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        
        // @ts-ignore
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const totalUsers = await User.countDocuments();
        const totalMaterials = await Material.countDocuments();
        const totalExams = await Exam.countDocuments();
        const totalCourses = await Course.countDocuments();

        const subscriptions = await BoardAccess.find({ status: 'active' });
        const totalRevenue = subscriptions.reduce((sum, sub) => sum + (sub.amount || 0), 0);

        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email createdAt');

        return NextResponse.json({
            totalUsers,
            totalMaterials,
            totalExams,
            totalCourses,
            totalRevenue,
            recentUsers: recentUsers.map(user => ({
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }))
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch admin stats' },
            { status: 500 }
        );
    }
}