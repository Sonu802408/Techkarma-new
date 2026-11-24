import mongoose from 'mongoose';

const ATLAS_URI = 'mongodb+srv://sonu:sonu%40123@cluster0.ibzynyr.mongodb.net/techkarmaclasses?retryWrites=true&w=majority';
let cachedConn = null;

export async function connectDB() {
    if (cachedConn && mongoose.connection.readyState === 1) {
        return cachedConn;
    }
    const uri = process.env.MONGODB_URI || ATLAS_URI;
    cachedConn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 8000,
        bufferCommands: false
    });
    return cachedConn;
}
