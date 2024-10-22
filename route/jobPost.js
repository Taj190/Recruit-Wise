import express from 'express';
import { isAdmin, isLoggedIn } from '../middleware/middle.js';
import { availableJobController, createJobController, deleteJobController, updateJobController } from '../controller/jobPostController.js';
export const createJob = express.Router();

createJob.post('/job-post',isLoggedIn,isAdmin,createJobController)
createJob.get('/available-jobs',availableJobController)
createJob.delete('/delete-job/:id',isLoggedIn,isAdmin,deleteJobController)
createJob.put('/edit-job-data/:id',isLoggedIn,isAdmin,updateJobController)
