import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP Server & Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // For dev. In prod, lock this to frontend domain
        methods: ['GET', 'POST']
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.set('io', io);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection with Cloud Atlas Failover
const ATLAS_URI = 'mongodb+srv://sonu:sonu%40123@cluster0.ibzynyr.mongodb.net/techkarmaclasses?retryWrites=true&w=majority';
const connectDatabase = async () => {
    const primaryUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techkarmaclasses';
    try {
        await mongoose.connect(primaryUri, { serverSelectionTimeoutMS: 5000 });
        console.log('MongoDB connected successfully to primary database');
    } catch (err) {
        console.warn('Primary MongoDB connection error, connecting to MongoDB Atlas Cloud failover...', err.message);
        try {
            await mongoose.connect(ATLAS_URI, { serverSelectionTimeoutMS: 10000 });
            console.log('MongoDB Atlas Cloud connected successfully!');
        } catch (atlasErr) {
            console.error('All MongoDB connection attempts failed:', atlasErr.message);
        }
    }
};
connectDatabase();

// Initialize Routes
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import subjectRoutes from './routes/subjects.js';
import materialRoutes from './routes/materials.js';
import queryRoutes from './routes/queries.js';
import examRoutes from './routes/exams.js';
import statsRoutes from './routes/stats.js';
import ncertBooksRoutes from './routes/ncertBooks.js';

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/ncert-books', ncertBooksRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Tech Karma Classes API is running');
});

import User from './models/User.js';

// Socket.io Real-Time Presence Tracking
// socketId -> { userId, name, showInOnlineList }
const socketUserMap = new Map();
// userId -> { name, showInOnlineList, socketIds: Set<string> }
const activeUsersMap = new Map();

const getPresenceData = async () => {
    let totalRegistered = 0;
    try {
        if (mongoose.connection.readyState === 1) {
            totalRegistered = await User.countDocuments({});
        }
    } catch (err) {
        console.warn('Error counting users:', err.message);
    }

    const totalLiveCount = io.engine.clientsCount || 0;
    const onlineUsers = Array.from(activeUsersMap.entries())
        .filter(([id, u]) => u.showInOnlineList !== false && u.name)
        .map(([id, u]) => ({ id, name: u.name }));

    return {
        totalLiveCount,
        liveStudentsCount: activeUsersMap.size,
        onlineStudentNames: onlineUsers.map(u => u.name),
        onlineStudentIds: onlineUsers.map(u => u.id),
        totalRegistered
    };
};

const broadcastPresence = async () => {
    // attach to app
    if (!app.get('broadcastPresence')) app.set('broadcastPresence', broadcastPresence);
    try {
        const presencePayload = await getPresenceData();
        io.emit('livePresenceUpdate', presencePayload);
        io.emit('liveUsersCount', presencePayload.totalLiveCount);
    } catch (err) {
        console.error('Error broadcasting presence:', err);
    }
};

// HTTP endpoint fallback for presence & live students
app.get('/api/stats/presence', async (req, res) => {
    try {
        const payload = await getPresenceData();
        res.json({ success: true, ...payload });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

io.on('connection', (socket) => {
    broadcastPresence();

    // Student logs in or identifies connection
    socket.on('user_online', async (data) => {
        if (!data || !data.userId || !data.name) return;

        const { userId, name, showInOnlineList } = data;
        const stringUserId = String(userId);
        socketUserMap.set(socket.id, { userId: stringUserId, name, showInOnlineList });

        if (!activeUsersMap.has(stringUserId)) {
            activeUsersMap.set(stringUserId, {
                name,
                showInOnlineList: showInOnlineList !== false,
                socketIds: new Set([socket.id])
            });
            try {
                if (mongoose.isValidObjectId(stringUserId)) {
                    await User.findByIdAndUpdate(stringUserId, { lastActive: new Date() });
                }
            } catch (e) {
                console.error('Error updating user lastActive:', e.message);
            }
        } else {
            activeUsersMap.get(stringUserId).socketIds.add(socket.id);
        }

        broadcastPresence();
    });

    // Student logs out explicitly
    socket.on('user_offline', async (data) => {
        const userId = data?.userId ? String(data.userId) : socketUserMap.get(socket.id)?.userId;
        if (userId && activeUsersMap.has(userId)) {
            try {
                if (mongoose.isValidObjectId(userId)) {
                    await User.findByIdAndUpdate(userId, { lastActive: new Date() });
                }
            } catch (e) {}
            activeUsersMap.delete(userId);
        }
        socketUserMap.delete(socket.id);
        broadcastPresence();
    });

    socket.on('disconnect', async () => {
        const userData = socketUserMap.get(socket.id);
        if (userData && userData.userId) {
            const userEntry = activeUsersMap.get(userData.userId);
            if (userEntry) {
                userEntry.socketIds.delete(socket.id);
                if (userEntry.socketIds.size === 0) {
                    try {
                        if (mongoose.isValidObjectId(userData.userId)) {
                            await User.findByIdAndUpdate(userData.userId, { lastActive: new Date() });
                        }
                    } catch (e) {}
                    activeUsersMap.delete(userData.userId);
                }
            }
            socketUserMap.delete(socket.id);
        }
        broadcastPresence();
    });
});

// Start Server (only if not running on Vercel)
if (process.env.NODE_ENV !== 'production') {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export the app for Vercel Serverless Functions
export default app;
