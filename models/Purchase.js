import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    materialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentId: String,
    orderId: String,
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'completed',
    },
    purchasedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Purchase || mongoose.model('Purchase', PurchaseSchema);