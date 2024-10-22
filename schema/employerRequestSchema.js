// models/contactFormSchema.js
import mongoose from 'mongoose';

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique:true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const EmployerForm = mongoose.model('EmployerForm', contactFormSchema);

export default EmployerForm;
