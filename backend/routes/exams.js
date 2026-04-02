import express from 'express';
import Exam from '../models/Exam.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET all exams based on subject level
router.get('/', async (req, res) => {
    try {
        const filters = {};
        if (req.query.subjectId) filters.subjectId = req.query.subjectId;
        if (req.query.level) filters.level = req.query.level;

        const exams = await Exam.find(filters).populate('subjectId', 'name classLevel');
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET exam by ID
router.get('/:id', async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id).populate('subjectId', 'name');
        if (exam) res.json(exam);
        else res.status(404).json({ message: 'Exam not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new exam (Admin only)
router.post('/', protect, adminOnly, async (req, res) => {
    try {
        const exam = new Exam(req.body);
        const createdExam = await exam.save();
        res.status(201).json(createdExam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST submit exam and calculate score
router.post('/:id/submit', protect, async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        const userAnswers = req.body.answers; // Expecting array of selected option indices
        let score = 0;
        let totalMarks = 0;

        exam.questions.forEach((q, index) => {
            totalMarks += q.marks || 1;
            if (userAnswers[index] === q.correctOptionIndex) {
                score += q.marks || 1;
            }
        });

        res.json({ score, totalMarks, percentage: (score / totalMarks) * 100 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
