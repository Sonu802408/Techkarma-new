import express from 'express';
import Query from '../models/Query.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST new query (Public)
router.post('/', async (req, res) => {
    try {
        const query = new Query(req.body);
        const createdQuery = await query.save();
        // Later we can add Nodemailer to send notification to admin
        res.status(201).json(createdQuery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET all queries (Admin only)
router.get('/', protect, adminOnly, async (req, res) => {
    try {
        const queries = await Query.find({}).sort({ createdAt: -1 });
        res.json(queries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT update query status (Admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const query = await Query.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (query) res.json(query);
        else res.status(404).json({ message: 'Query not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
