import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: 'New Website Visitor'
    },
    className: {
        type: String,
        default: ''
    },
    photo: {
        type: String,
        default: ''
    },
    source: {
        type: String,
        default: 'Website Visitor'
    },
    status: {
        type: String,
        enum: ['Pending', 'Resolved'],
        default: 'Pending'
    }
}, { timestamps: true });

export default mongoose.model('Query', querySchema);
