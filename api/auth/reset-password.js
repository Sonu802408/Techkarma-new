import { connectDB } from '../_db.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    className: { type: String, default: 'Class 10' },
    role: { type: String, enum: ['admin', 'student'], default: 'student' },
    lastActive: { type: Date, default: Date.now },
    showInOnlineList: { type: Boolean, default: true },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await connectDB();
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
        const { identifier, newPassword, role } = body;

        if (!identifier || !newPassword) {
            return res.status(400).json({ message: 'Please provide email/phone and new password' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters long' });
        }

        const trimmed = identifier.trim();
        const query = trimmed.includes('@')
            ? { email: trimmed.toLowerCase() }
            : { phone: trimmed };

        if (role) {
            query.role = role;
        }

        const user = await User.findOne(query);

        if (!user) {
            return res.status(404).json({ message: `No ${role || 'user'} account found with this email or phone number` });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        return res.json({
            success: true,
            message: `Password for ${user.name} (${user.role}) has been reset successfully. You can now log in!`
        });
    } catch (err) {
        console.error('Reset password error:', err);
        return res.status(500).json({ message: 'Error resetting password', error: err.message });
    }
}
