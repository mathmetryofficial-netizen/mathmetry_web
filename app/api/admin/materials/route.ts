import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Material from '@/models/Material';

export async function POST(req: Request) {
    try {
        await dbConnect();

        const { title, description, subject, classLevel, board, chapter, fileUrl, previewUrl, materialType, price } = await req.json();

        console.log('Creating material with data:', { title, description, subject, classLevel, board, chapter, fileUrl, previewUrl, materialType, price });

        const priceValue = parseFloat(price) || 0;
        console.log('Price conversion:', { original: price, converted: priceValue });

        const material = await Material.create({
            title,
            description,
            subject,
            classLevel,
            board,
            chapter,
            fileUrl,
            previewUrl,
            type: materialType,
            price: priceValue
        });

        console.log('Created material:', material);

        return NextResponse.json({
            message: 'Material added successfully',
            materialId: material._id
        });
    } catch (error) {
        console.error('Material creation error:', error);
        return NextResponse.json(
            { error: 'Failed to add material' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();

        const materials = await Material.find().sort({ createdAt: -1 });

        return NextResponse.json({ materials });
    } catch (error) {
        console.error('Materials fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch materials' },
            { status: 500 }
        );
    }
}