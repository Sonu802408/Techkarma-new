import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from '../backend/routes/auth.js';
import courseRoutes from '../backend/routes/courses.js';
import subjectRoutes from '../backend/routes/subjects.js';
import materialRoutes from '../backend/routes/materials.js';
import queryRoutes from '../backend/routes/queries.js';
import examRoutes from '../backend/routes/exams.js';
import statsRoutes from '../backend/routes/stats.js';
import ncertBooksRoutes from '../backend/routes/ncertBooks.js';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const ATLAS_URI = 'mongodb+srv://sonu:sonu%40123@cluster0.ibzynyr.mongodb.net/techkarmaclasses?retryWrites=true&w=majority';
let isDbConnected = false;

const connectDB = async () => {
    if (isDbConnected && mongoose.connection.readyState === 1) return;
    try {
        const uri = process.env.MONGODB_URI || ATLAS_URI;
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 8000,
            bufferCommands: false
        });
        isDbConnected = true;
        console.log('MongoDB Atlas Cloud connected for Serverless API!');
    } catch (err) {
        console.error('Serverless MongoDB connection error:', err.message);
    }
};

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/ncert-books', ncertBooksRoutes);

app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'Tech Karma Classes Cloud Serverless API is live!',
        dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting'
    });
});

export default app;
