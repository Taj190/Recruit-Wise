import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type:Number,
        default: 0
    },
    answer1: {
        type: String,
        required: true
    },
    answer2: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
   
    
})
export default mongoose.model('admin', adminSchema)