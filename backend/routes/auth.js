import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import { sendWhatsAppNotification } from '../services/whatsappService.js';

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
            className: req.body.className || 'Class 10',
            showInOnlineList: showInOnlineList !== undefined ? showInOnlineList : true,
            lastActive: new Date()
        });

        if (user) {
            // Trigger WhatsApp Notification to Admin
            sendWhatsAppNotification({
                name: user.name,
                phone: user.phone,
                email: user.email,
                source: 'New Student Registration'
            }).catch(e => console.error('WhatsApp notify error:', e.message));

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
        const cleanEmail = email.toLowerCase().trim();
        const cleanPass = password.trim();

        // Master Admin Credentials: sonuk802408@gmail.com / Sonu kumar81
        if ((cleanEmail === 'sonuk802408@gmail.com' || cleanEmail === '8130550381' || cleanEmail === 'sonuk802408@gmail,com') && (cleanPass === 'Sonu kumar81' || password === 'Sonu kumar81 ')) {
            let adminUser = await User.findOne({
                $or: [{ email: 'sonuk802408@gmail.com' }, { role: 'admin' }]
            });

            if (!adminUser) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash('Sonu kumar81', salt);
                adminUser = await User.create({
                    name: 'Sonu Kumar (Admin)',
                    email: 'sonuk802408@gmail.com',
                    phone: '8130550381',
                    password: hashedPassword,
                    role: 'admin',
                    showInOnlineList: true,
                    lastActive: new Date()
                });
            } else {
                adminUser.role = 'admin';
                adminUser.email = 'sonuk802408@gmail.com';
                adminUser.lastActive = new Date();
                await adminUser.save();
            }

            return res.json({
                _id: adminUser._id,
                name: adminUser.name || 'Sonu Kumar (Admin)',
                email: 'sonuk802408@gmail.com',
                phone: adminUser.phone || '8130550381',
                role: 'admin',
                showInOnlineList: true,
                token: generateToken(adminUser._id, 'admin'),
            });
        }

        const query = email.includes('@')
            ? { email: cleanEmail }
            : { phone: email.trim() };

        const user = await User.findOne(query);

        if (user && (await bcrypt.compare(password, user.password) || (user.role === 'admin' && cleanPass === 'Sonu kumar81'))) {
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

// @route POST /api/auth/reset-password (Available for both Student and Admin)
router.post('/reset-password', async (req, res) => {
    const { identifier, newPassword, role } = req.body;

    if (!identifier || !newPassword) {
        return res.status(400).json({ message: 'Please provide your registered Email/Phone and new password' });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    try {
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

        res.json({
            success: true,
            message: `Password for ${user.name} (${user.role}) has been reset successfully. You can now log in!`
        });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Server error during password reset', error: error.message });
    }
});

// @route POST /api/auth/register-lead (Compulsory lead modal auto-registration)
router.post('/register-lead', async (req, res) => {
    const { name, phone, email, className, photo } = req.body;

    if (!name || !phone || !email) {
        return res.status(400).json({ message: 'Name, phone, and email are required' });
    }

    try {
        const cleanEmail = email.toLowerCase().trim();
        const cleanPhone = phone.trim();

        let user = await User.findOne({
            $or: [{ email: cleanEmail }, { phone: cleanPhone }]
        });

        if (!user) {
            // Create student account with temporary default password (phone number)
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(cleanPhone, salt);

            user = await User.create({
                name: name.trim(),
                phone: cleanPhone,
                email: cleanEmail,
                password: hashedPassword,
                className: className || 'Class 10',
                role: 'student',
                showInOnlineList: true,
                lastActive: new Date()
            });

            sendWhatsAppNotification({
                name: user.name,
                phone: user.phone,
                email: user.email,
                source: `Compulsory Form (${className || 'Student'})`
            }).catch(() => {});
        } else {
            user.lastActive = new Date();
            if (className) user.className = className;
            await user.save();
        }

        res.json({
            success: true,
            message: 'Lead registered successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                className: user.className,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Lead registration error:', error);
        res.status(500).json({ message: 'Error registering lead', error: error.message });
    }
});

// @route POST /api/auth/admin/students (Admin adds student directly)
router.post('/admin/students', protect, adminOnly, async (req, res) => {
    const { name, phone, email, password, className, role } = req.body;

    if (!name || !phone || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields: name, phone, email, password' });
    }

    try {
        const cleanEmail = email.toLowerCase().trim();
        const cleanPhone = phone.trim();

        const existing = await User.findOne({
            $or: [{ email: cleanEmail }, { phone: cleanPhone }]
        });

        if (existing) {
            return res.status(400).json({ message: 'A student with this email or phone already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStudent = await User.create({
            name: name.trim(),
            phone: cleanPhone,
            email: cleanEmail,
            password: hashedPassword,
            className: className || 'Class 10',
            role: role || 'student',
            className: req.body.className || 'Class 10',
            showInOnlineList: true,
            lastActive: new Date()
        });

        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            student: {
                _id: newStudent._id,
                name: newStudent.name,
                email: newStudent.email,
                phone: newStudent.phone,
                className: newStudent.className,
                role: newStudent.role,
                createdAt: newStudent.createdAt
            }
        });
    } catch (error) {
        console.error('Admin create student error:', error);
        res.status(500).json({ message: 'Server error creating student', error: error.message });
    }
});

// @route DELETE /api/auth/admin/students/:id (Admin removes student)
router.delete('/admin/students/:id', protect, adminOnly, async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Prevent admin from deleting themselves
        if (student._id.toString() === req.user.id) {
            return res.status(400).json({ message: 'You cannot delete your own admin account' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: `Student ${student.name} deleted successfully` });
    } catch (error) {
        console.error('Admin delete student error:', error);
        res.status(500).json({ message: 'Server error deleting student', error: error.message });
    }
});

// @route PUT /api/auth/admin/students/:id/reset-password (Admin resets student password)
router.put('/admin/students/:id/reset-password', protect, adminOnly, async (req, res) => {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    try {
        const student = await User.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(newPassword, salt);
        await student.save();

        res.json({
            success: true,
            message: `Password for ${student.name} has been updated successfully`
        });
    } catch (error) {
        console.error('Admin reset student password error:', error);
        res.status(500).json({ message: 'Server error resetting password', error: error.message });
    }
});

// @route POST /api/auth/seed-admin (Ensure default admin exists)
router.post('/seed-admin', async (req, res) => {
    try {
        const adminEmail = 'sonuk802408@gmail.com';
        const adminPhone = '8130550381';
        let admin = await User.findOne({
            $or: [{ email: adminEmail }, { role: 'admin' }]
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Sonu kumar81', salt);

        if (!admin) {
            admin = await User.create({
                name: 'Sonu Kumar (Admin)',
                email: adminEmail,
                phone: adminPhone,
                password: hashedPassword,
                role: 'admin',
                showInOnlineList: true
            });
            return res.json({ success: true, message: 'Sonu Kumar admin account created', email: adminEmail });
        } else {
            admin.email = adminEmail;
            admin.role = 'admin';
            admin.password = hashedPassword;
            await admin.save();
            return res.json({ success: true, message: 'Admin account credentials updated to Sonu Kumar', email: adminEmail });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error checking/seeding admin', error: error.message });
    }
});

export default router;
