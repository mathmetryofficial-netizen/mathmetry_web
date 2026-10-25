import mongoose from 'mongoose';

const BoardAccessSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    amount: {
        type: Number,
        required: true,
    },
    paymentId: String,
    orderId: String,
    status: {
        type: String,
        enum: ['active', 'expired'],
        default: 'active',
    },
    purchasedAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
    },
});

BoardAccessSchema.index({ userId: 1, classLevel: 1, board: 1 });
BoardAccessSchema.index({ userId: 1, status: 1 });
BoardAccessSchema.index({ purchasedAt: -1 });

export default mongoose.models.BoardAccess || mongoose.model('BoardAccess', BoardAccessSchema);
