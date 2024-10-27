import express from 'express';
import dotenv from 'dotenv';
import ConnectDb from './config/db.js';
import { authentication } from './route/registration.js';
import cookieParser from 'cookie-parser';
import { uploadData } from './route/dataSubmission.js';
import cors from 'cors';
import { job } from './route/jobData.js';
import { createJob } from './route/jobPost.js';
import { createCategory } from './route/category.js';
import { jobApplication } from './route/jobApplicationRoute.js';
import { employerRequest } from './route/employerRoute.js';
import path from 'path'
// Load environment variables from .env file
dotenv.config();

// Connect to the database
ConnectDb();

// Initialize Express app
const app = express();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Enable CORS for client and admin frontends hosted on Vercel
const corsOptions = {
  origin: ['https://recruitwise.pt', 'https://recruit-wise-admin.vercel.app'], // Your Vercel frontend URLs
  credentials: true,
};
app.use(cors(corsOptions));
// To get cv 
app.use('/filefolder', express.static(path.join(process.cwd(), 'filefolder')));
// Define API routes
app.use('/auth', authentication);
app.use('/form-submission', uploadData);
app.use('/job-portal', job);
app.use('/job-listing', createJob);
app.use('/job-category', createCategory);
app.use('/job-apply', jobApplication);
app.use('/employer', employerRequest);

// Start the server on the specified port
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
