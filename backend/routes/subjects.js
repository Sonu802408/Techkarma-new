import express from 'express';
import Subject from '../models/Subject.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET all subjects or filter by class/medium
router.get('/', async (req, res) => {
    try {
        const filters = {};
        if (req.query.classLevel) filters.classLevel = req.query.classLevel;
        if (req.query.medium) filters.medium = req.query.medium;

        const subjects = await Subject.find(filters);
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new subject (Admin only)
router.post('/', protect, adminOnly, async (req, res) => {
    try {
        const subject = new Subject(req.body);
        const createdSubject = await subject.save();
        res.status(201).json(createdSubject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
