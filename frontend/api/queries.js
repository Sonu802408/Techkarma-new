import { connectDB } from './_db.js';
import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    className: { type: String, default: 'Class 10' },
    status: { type: String, default: 'Pending' },
    source: { type: String, default: 'Website Inquiry' }
}, { timestamps: true });

const Query = mongoose.models.Query || mongoose.model('Query', querySchema);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        await connectDB();

        if (req.method === 'GET') {
            const queries = await Query.find({}).sort({ createdAt: -1 }).limit(100).lean();
            return res.json(queries);
        }

        if (req.method === 'POST') {
            const query = new Query(req.body);
            const saved = await query.save();
            return res.status(201).json(saved);
        }

        return res.status(405).json({ message: 'Method Not Allowed' });
    } catch (err) {
        console.error('Serverless queries error:', err);
        return res.status(500).json({ message: 'Error handling query', error: err.message });
    }
}
