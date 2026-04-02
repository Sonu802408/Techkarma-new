import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    classLevel: {
        type: String,
        required: true,
        // E.g., '10', '12-Science', '12-Commerce'
    },
    medium: {
        type: String,
        enum: ['Hindi', 'English'],
        required: true
    },
    syllabus: [{
        chapterNo: Number,
        title: String,
        description: String
    }]
}, { timestamps: true });

export default mongoose.model('Subject', subjectSchema);
