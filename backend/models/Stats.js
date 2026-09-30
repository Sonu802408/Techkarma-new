import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
    totalVisits: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('Stats', statsSchema);
