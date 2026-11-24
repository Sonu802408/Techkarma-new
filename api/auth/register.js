import { connectDB } from '../_db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
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
        let { name, phone, email, password, role, className, showInOnlineList } = body;

        if (!name || !phone) {
            return res.status(400).json({ message: 'Please provide at least your name and phone number' });
        }

        const cleanName = String(name).trim();
        const cleanPhone = String(phone).trim();
        const cleanEmail = email && String(email).trim() ? String(email).toLowerCase().trim() : `${cleanPhone}@student.techkarma.com`;
        const cleanPass = password || cleanPhone;

        let user = await User.findOne({
            $or: [{ phone: cleanPhone }, { email: cleanEmail }]
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(cleanPass, salt);

        if (user) {
            if (user.role !== 'admin') {
                user.name = cleanName;
                user.className = className || user.className || 'Class 10';
                user.password = hashedPassword;
                user.lastActive = new Date();
                user.showInOnlineList = showInOnlineList !== undefined ? showInOnlineList : true;
                await user.save();
            }
        } else {
            user = await User.create({
                name: cleanName,
                phone: cleanPhone,
                email: cleanEmail,
                password: hashedPassword,
                role: role || 'student',
                className: className || 'Class 10',
                showInOnlineList: showInOnlineList !== undefined ? showInOnlineList : true,
                lastActive: new Date()
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'supersecretjwtkey_2026techkarma',
            { expiresIn: '30d' }
        );

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            className: user.className,
            role: user.role,
            showInOnlineList: user.showInOnlineList,
            lastActive: user.lastActive,
            createdAt: user.createdAt,
            token
        });
    } catch (err) {
        console.error('Serverless register error:', err);
        return res.status(500).json({ message: 'Error registering student', error: err.message });
    }
}
