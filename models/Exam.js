import mongoose from 'mongoose';

// Delete existing model to force refresh
if (mongoose.models.Exam) {
    delete mongoose.models.Exam;
}

const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [{ type: String, required: true }], // Array of options like ["A", "B", "C", "D"]
    correctOption: { type: Number, required: true }, // Index of the correct option (0-3)
    marks: { type: Number, default: 1 },
});

const ExamSchema = new mongoose.Schema({
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
        type: String, // e.g., "Class 10", "Class 12"
    },
    durationMinutes: {
        type: Number,
        required: true,
    },
    totalMarks: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    questions: [QuestionSchema],
    isPublished: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Add indexes for faster queries
ExamSchema.index({ subject: 1 });
ExamSchema.index({ classLevel: 1 });
ExamSchema.index({ isPublished: 1 });
ExamSchema.index({ createdAt: -1 });

export default mongoose.models.Exam || mongoose.model('Exam', ExamSchema);
