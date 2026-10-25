import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Material from '@/models/Material';
import BoardAccess from '@/models/BoardAccess';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        const { id } = await params;
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const material = await Material.findById(id).select('title classLevel board fileUrl previewUrl').lean();
        
        if (!material) {
            return NextResponse.json({ error: 'Material not found' }, { status: 404 });
        }

        const hasAccess = await BoardAccess.findOne({
            userId: session.user.id,
            classLevel: material.classLevel,
            board: material.board,
            status: 'active'
        }).lean();

        const isAdmin = session.user.role === 'admin';

        return NextResponse.json({
            material: {
                _id: material._id.toString(),
                title: material.title,
                fileUrl: material.fileUrl,
                previewUrl: material.previewUrl
            },
            hasAccess: !!(hasAccess || isAdmin)
        });
    } catch (error) {
        console.error('Get material error:', error);
        return NextResponse.json({ error: 'Failed to fetch material' }, { status: 500 });
    }
}
