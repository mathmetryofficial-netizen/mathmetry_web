import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Material from '@/models/Material';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        
        const { title, description, subject, classLevel, fileUrl, previewUrl, materialType, price } = await req.json();
        const { id } = await params;

        const material = await Material.findByIdAndUpdate(
            id,
            {
                title,
                description,
                subject,
                classLevel,
                fileUrl,
                previewUrl,
                type: materialType,
                price: Number(price) || 0
            },
            { new: true }
        );

        if (!material) {
            return NextResponse.json({ error: 'Material not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Material updated successfully', material });
    } catch (error) {
        console.error('Material update error:', error);
        return NextResponse.json(
            { error: 'Failed to update material' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        
        const { id } = await params;
        const material = await Material.findByIdAndDelete(id);

        if (!material) {
            return NextResponse.json({ error: 'Material not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Material deleted successfully' });
    } catch (error) {
        console.error('Material delete error:', error);
        return NextResponse.json(
            { error: 'Failed to delete material' },
            { status: 500 }
        );
    }
}