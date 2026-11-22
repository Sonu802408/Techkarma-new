import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: false
    },
    classNumber: {
        type: String,
        default: '10'
    },
    subjectName: {
        type: String,
        default: 'General'
    },
    chapterName: {
        type: String,
        default: 'All Chapters'
    },
    type: {
        type: String,
        enum: ['Notes', 'PDF', 'Video', 'MCQ', 'Book', 'NCERT Solutions', 'Sample Papers', 'Previous Year Papers', 'Subjective Questions', 'Online Test'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        default: ''
    },
    videoUrl: {
        type: String,
        default: ''
    },
    duration: {
        type: String,
        default: ''
    },
    faculty: {
        type: String,
        default: 'Tech Karma Classes'
    },
    mcqData: {
        question: String,
        options: [String],
        correctAnswer: String,
        explanation: String
    },
    content: {
        type: String,
        default: ''
    }
}, { timestamps: true });

export default mongoose.model('Material', materialSchema);
