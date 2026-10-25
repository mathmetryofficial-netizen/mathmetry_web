import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Material from '@/models/Material';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const url = new URL(req.url);
        const classLevel = url.searchParams.get('class') || url.searchParams.get('classLevel');
        const board = url.searchParams.get('board');

        const query: Record<string, any> = {};
        if (classLevel) query.classLevel = classLevel;
        if (board) query.board = new RegExp(`^${board}$`, 'i');

        const materials = await Material.find(query).sort({ createdAt: -1 }).lean();
        
        return NextResponse.json({ materials });
    } catch (error) {
        console.error('Error fetching materials:', error);
        return NextResponse.json({ message: 'Error fetching materials', materials: [] }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const { title, description, subject, classLevel, board, chapter, type, content, fileUrl, previewUrl, price } = await req.json();

        await dbConnect();

        const material = await Material.create({
            title,
            description,
            subject,
            classLevel,
            board: board || 'Foundation',
            chapter: chapter || 'General',
            type: type || 'pdf',
            content,
            fileUrl,
            previewUrl,
            price: price ? parseFloat(price) : 0
        });

        return NextResponse.json(material, { status: 201 });
    } catch (error) {
        console.error('Error creating material:', error);
        return NextResponse.json({ message: 'Error creating material' }, { status: 500 });
    }
}
