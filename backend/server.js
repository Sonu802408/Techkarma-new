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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Initialize Routes
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import subjectRoutes from './routes/subjects.js';
import materialRoutes from './routes/materials.js';
import queryRoutes from './routes/queries.js';
import examRoutes from './routes/exams.js';
import statsRoutes from './routes/stats.js';

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/stats', statsRoutes);

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

const broadcastPresence = async () => {
    try {
        let totalRegistered = 0;
        try {
            totalRegistered = await User.countDocuments({});
        } catch (err) {
            const all = await User.find({}, '_id').lean();
            totalRegistered = all ? all.length : 0;
        }

        const totalLiveCount = io.engine.clientsCount || 0;
        // Public list: only extract user names where consent is not false
        const onlineStudentNames = Array.from(activeUsersMap.values())
            .filter(u => u.showInOnlineList !== false && u.name)
            .map(u => u.name);

        const presencePayload = {
            totalLiveCount,
            liveStudentsCount: activeUsersMap.size,
            onlineStudentNames,
            totalRegistered
        };

        io.emit('livePresenceUpdate', presencePayload);
        io.emit('liveUsersCount', totalLiveCount);
    } catch (err) {
        console.error('Error broadcasting presence:', err);
    }
};

io.on('connection', (socket) => {
    broadcastPresence();

    // Student logs in or identifies connection
    socket.on('user_online', async (data) => {
        if (!data || !data.userId || !data.name) return;

        const { userId, name, showInOnlineList } = data;
        socketUserMap.set(socket.id, { userId, name, showInOnlineList });

        if (!activeUsersMap.has(userId)) {
            activeUsersMap.set(userId, {
                name,
                showInOnlineList: showInOnlineList !== false,
                socketIds: new Set([socket.id])
            });
            try {
                await User.findByIdAndUpdate(userId, { lastActive: new Date() });
            } catch (e) {
                console.error('Error updating user lastActive:', e);
            }
        } else {
            activeUsersMap.get(userId).socketIds.add(socket.id);
        }

        broadcastPresence();
    });

    // Student logs out explicitly
    socket.on('user_offline', async (data) => {
        const userId = data?.userId || socketUserMap.get(socket.id)?.userId;
        if (userId && activeUsersMap.has(userId)) {
            try {
                await User.findByIdAndUpdate(userId, { lastActive: new Date() });
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
                        await User.findByIdAndUpdate(userData.userId, { lastActive: new Date() });
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
