import express from 'express';
import Stats from '../models/Stats.js';
import User from '../models/User.js';

const router = express.Router();

// Get overall stats
router.get('/', async (req, res) => {
    try {
        let totalUsers = 0;
        try {
            totalUsers = await User.countDocuments({});
        } catch (cntErr) {
            const allUsers = await User.find({}, '_id').lean();
            totalUsers = allUsers ? allUsers.length : 0;
        }
        
        let statsDoc = await Stats.findOne();
        if (!statsDoc) {
            statsDoc = new Stats({ totalVisits: 0 });
            await statsDoc.save();
        }

        res.json({
            success: true,
            totalUsers,
            totalVisits: statsDoc.totalVisits || 0
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ success: false, message: 'Server error fetching stats' });
    }
});

// Increment visit count
router.post('/visit', async (req, res) => {
    try {
        let statsDoc = await Stats.findOne();
        if (!statsDoc) {
            statsDoc = new Stats({ totalVisits: 1 });
        } else {
            statsDoc.totalVisits += 1;
        }
        await statsDoc.save();

        res.json({ success: true, totalVisits: statsDoc.totalVisits });
    } catch (error) {
        console.error('Error recording visit:', error);
        res.status(500).json({ success: false, message: 'Server error recording visit' });
    }
});

export default router;
