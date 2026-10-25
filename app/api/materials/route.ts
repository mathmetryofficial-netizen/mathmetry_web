import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Material from '@/models/Material';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const materials = await Material.find({}).sort({ createdAt: -1 });
        return NextResponse.json(materials);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching materials' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const { title, subject, classLevel, type, content, fileUrl } = await req.json();

        await dbConnect();

        const material = await Material.create({
            title,
            subject,
            classLevel,
            type,
            content,
            fileUrl
        });

        return NextResponse.json(material, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating material' }, { status: 500 });
    }
}
