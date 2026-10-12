import express from 'express';
import Query from '../models/Query.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import { sendWhatsAppNotification } from '../services/whatsappService.js';

const router = express.Router();

// POST new query or visitor lead (Public)
router.post('/', async (req, res) => {
    try {
        const query = new Query(req.body);
        const createdQuery = await query.save();

        // Trigger WhatsApp Notification to Admin
        const waResult = await sendWhatsAppNotification({
            name: createdQuery.name,
            phone: createdQuery.phone,
            email: createdQuery.email,
            className: createdQuery.className || req.body.className || '',
            message: createdQuery.message,
            source: createdQuery.source || 'Website Visitor'
        });

        res.status(201).json({
            ...createdQuery.toObject(),
            waDirectUrl: waResult?.waDirectUrl
        });
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
