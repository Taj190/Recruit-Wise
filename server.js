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
import path from 'path'; // Import path for serving static files

// Load environment variables from .env file
dotenv.config();

// Connect to the database
ConnectDb();

// Initialize Express app
const app = express();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Enable CORS for client and admin frontends
const corsOptions = {
  origin: ['https://recruit-wise.vercel.app', 'https://recruit-wise-admin.vercel.app'], // Update this for production domains
  credentials: true,
};
app.use(cors(corsOptions));
// Function to get the directory name
const __dirname = path.resolve();

// Serve static files for the client
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Serve static files for the admin panel
app.use('/admin', express.static(path.join(__dirname, 'admin', 'dist')));

// Serve the index.html file for the admin panel
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'dist', 'index.html'));
});

// Serve the index.html file for the client for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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