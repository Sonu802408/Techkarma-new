import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    type: {
        type: String,
        enum: ['Notes', 'MCQ', 'Book', 'NCERT Solutions', 'Sample Papers', 'Previous Year Papers', 'Subjective Questions', 'Online Test'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        // Will store path to uploaded PDF or content
    },
    content: {
        type: String,
        // For rich text or external links if not a direct file
    }
}, { timestamps: true });

export default mongoose.model('Material', materialSchema);
