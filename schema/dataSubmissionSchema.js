import mongoose from 'mongoose';

// Define the schema for the applicant
const applicantSchema = new mongoose.Schema({
    taxNumber: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    
    residencyCard: {
        type: Boolean,
        required: true,
    },
    cvFilePath: {
        type: String,  // Store the local file path of the CV
        required: true,
    },
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt timestamps
});

const Applicant = mongoose.model('Applicant', applicantSchema);
export default Applicant;
