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

// GET materials by subject ID or type
router.get('/', async (req, res) => {
    try {
        const filters = {};
        if (req.query.subjectId) filters.subjectId = req.query.subjectId;
        if (req.query.type) filters.type = req.query.type;

        const materials = await Material.find(filters).populate('subjectId', 'name');
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new material with file upload (Admin only)
router.post('/', protect, adminOnly, upload.single('file'), async (req, res) => {
    try {
        const { subjectId, type, title, content } = req.body;
        let fileUrl = '';

        if (req.file) {
            fileUrl = `/${req.file.path.replace(/\\/g, '/')}`; // Ensure correct path separator on Windows
        }

        const material = new Material({
            subjectId,
            type,
            title,
            content,
            fileUrl
        });

        const createdMaterial = await material.save();
        res.status(201).json(createdMaterial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE material (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const material = await Material.findByIdAndDelete(req.params.id);
        if (material) res.json({ message: 'Material removed' });
        else res.status(404).json({ message: 'Material not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
