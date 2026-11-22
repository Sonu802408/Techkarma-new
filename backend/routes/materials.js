import express from 'express';
import multer from 'multer';
import path from 'path';
import Material from '../models/Material.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${req.body.title ? req.body.title.replace(/\s+/g, '-').toLowerCase() : 'doc'}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        // accept strictly pdf or images and docx for materials
        const filetypes = /pdf|doc|docx|jpg|jpeg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Documents and Images only!');
        }
    }
});

// GET materials with flexible filters (classNumber, subjectName, chapterName, type)
router.get('/', async (req, res) => {
    try {
        const filters = {};
        if (req.query.classNumber) filters.classNumber = req.query.classNumber;
        if (req.query.subjectName) filters.subjectName = new RegExp(`^${req.query.subjectName}$`, 'i');
        if (req.query.chapterName) filters.chapterName = req.query.chapterName;
        if (req.query.type) filters.type = req.query.type;
        if (req.query.subjectId) filters.subjectId = req.query.subjectId;

        const materials = await Material.find(filters).sort({ createdAt: -1 });
        res.json({
            success: true,
            count: materials.length,
            materials
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new material (Admin only, supports file upload or direct URL)
router.post('/', protect, adminOnly, upload.single('file'), async (req, res) => {
    try {
        const {
            classNumber,
            subjectName,
            chapterName,
            type,
            title,
            content,
            fileUrl: directFileUrl,
            videoUrl,
            duration,
            faculty,
            mcqData
        } = req.body;

        let fileUrl = directFileUrl || '';
        if (req.file) {
            fileUrl = `/${req.file.path.replace(/\\/g, '/')}`;
        }

        let parsedMcqData = null;
        if (mcqData) {
            try {
                parsedMcqData = typeof mcqData === 'string' ? JSON.parse(mcqData) : mcqData;
            } catch (e) {
                parsedMcqData = mcqData;
            }
        }

        const material = new Material({
            classNumber: classNumber || '10',
            subjectName: subjectName || 'General',
            chapterName: chapterName || 'All Chapters',
            type: type || 'Notes',
            title: title || 'Untitled Material',
            content: content || '',
            fileUrl,
            videoUrl: videoUrl || '',
            duration: duration || '',
            faculty: faculty || 'Tech Karma Classes',
            mcqData: parsedMcqData
        });

        const createdMaterial = await material.save();
        res.status(201).json({
            success: true,
            message: 'Material added successfully',
            material: createdMaterial
        });
    } catch (error) {
        console.error('Create material error:', error);
        res.status(400).json({ message: error.message });
    }
});

// DELETE material (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const material = await Material.findByIdAndDelete(req.params.id);
        if (material) {
            res.json({ success: true, message: `Material '${material.title}' removed successfully` });
        } else {
            res.status(404).json({ message: 'Material not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT update material (Admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const updated = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updated) {
            res.json({ success: true, message: 'Material updated', material: updated });
        } else {
            res.status(404).json({ message: 'Material not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
