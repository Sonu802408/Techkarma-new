import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Summer Vacation', 'Programming', 'Core Computer', 'Advanced Technology'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    features: [{
        type: String
    }],
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
