import mongoose from 'mongoose';

// Delete existing model to force refresh
if (mongoose.models.Material) {
    delete mongoose.models.Material;
}

const MaterialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    subject: {
        type: String,
        required: true,
    },
    classLevel: {
        type: String,
        required: true,
    },
    board: {
        type: String,
        required: true,
        enum: ['Foundation', 'ICSE', 'CBSE'],
    },
    chapter: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['pdf', 'text', 'video_link'],
        required: true,
    },
    fileUrl: {
        type: String,
    },
    previewUrl: {
        type: String,
    },
    content: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    isPremium: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Add indexes for faster queries
MaterialSchema.index({ classLevel: 1, board: 1 });
MaterialSchema.index({ subject: 1 });
MaterialSchema.index({ createdAt: -1 });

export default mongoose.model('Material', MaterialSchema);
