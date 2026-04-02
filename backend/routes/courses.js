import express from 'express';
import Course from '../models/Course.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) res.json(course);
        else res.status(404).json({ message: 'Course not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new course (Admin only)
router.post('/', protect, adminOnly, async (req, res) => {
    try {
        const course = new Course(req.body);
        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update course (Admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (course) res.json(course);
        else res.status(404).json({ message: 'Course not found' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE course (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (course) res.json({ message: 'Course removed' });
        else res.status(404).json({ message: 'Course not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
