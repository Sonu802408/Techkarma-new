import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/exams', examRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Tech Karma Classes API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
