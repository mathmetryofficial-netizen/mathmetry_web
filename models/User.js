import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        select: false,
    },
    mobile: {
        type: String,
        required: [true, 'Please provide a mobile number'],
        trim: true,
    },
    mobileVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        select: false,
    },
    otpExpiry: {
        type: Date,
        select: false,
    },
    classLevel: {
        type: String,
        enum: ['Class 9', 'Class 10', 'Class 11', 'Class 12', ''],
    },
    school: {
        type: String,
        maxlength: [100, 'School name cannot be more than 100 characters'],
    },
    city: {
        type: String,
        maxlength: [50, 'City name cannot be more than 50 characters'],
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student',
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    purchasedMaterials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material',
    }],
    subscriptionStatus: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
