import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
    const { name, phone, email, password, role, showInOnlineList } = req.body;

    if (!name || !phone || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields: name, phone, email, password' });
    }

    try {
        const userExists = await User.findOne({ email: email.toLowerCase().trim() });

        if (userExists) {
            return res.status(400).json({ message: 'An account with this email already exists' });
        }

        const phoneExists = await User.findOne({ phone: phone.trim() });
        if (phoneExists) {
            return res.status(400).json({ message: 'An account with this phone number already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name: name.trim(),
            phone: phone.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: role || 'student',
            showInOnlineList: showInOnlineList !== undefined ? showInOnlineList : true,
            lastActive: new Date()
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                showInOnlineList: user.showInOnlineList,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
});

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email/phone and password' });
    }

    try {
        const query = email.includes('@')
            ? { email: email.toLowerCase().trim() }
            : { phone: email.trim() };

        const user = await User.findOne(query);

        if (user && (await bcrypt.compare(password, user.password))) {
            user.lastActive = new Date();
            await user.save();

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                showInOnlineList: user.showInOnlineList,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid email/phone or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

// @route GET /api/auth/me (Protected)
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route GET /api/auth/users (Admin only)
router.get('/users', protect, adminOnly, async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        console.error('Admin users fetch error:', error);
        res.status(500).json({ message: 'Server error fetching users', error: error.message });
    }
});

export default router;
