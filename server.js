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

// Serve static files for CV uploads
app.use('/filefolder', express.static('filefolder'));

// Serve static files from the client and admin build directories
app.use(express.static(path.join(__dirname, 'client', 'dist'))); // Client build
app.use(express.static(path.join(__dirname, 'admin', 'dist'))); // Admin build

// Define API routes
app.use('/auth', authentication);
app.use('/form-submission', uploadData);
app.use('/job-portal', job);
app.use('/job-listing', createJob);
app.use('/job-category', createCategory);
app.use('/job-apply', jobApplication);
app.use('/employer', employerRequest);

// Fallback route for serving the index.html for React Router
app.get('*', (req, res) => {
  const clientPath = path.join(__dirname, 'client', 'dist', 'index.html');
  const adminPath = path.join(__dirname, 'admin', 'dist', 'index.html');

  // Serve index.html based on the request URL
  if (req.path.startsWith('/admin')) {
    res.sendFile(adminPath); // Serve admin index.html for admin routes
  } else {
    res.sendFile(clientPath); // Serve client index.html for other routes
  }
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
