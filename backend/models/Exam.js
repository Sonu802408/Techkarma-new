import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    durationMinutes: {
        type: Number,
        required: true,
        default: 30
    },
    questions: [{
        questionText: String,
        options: [String],
        correctOptionIndex: Number,
        marks: Number
    }]
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);
