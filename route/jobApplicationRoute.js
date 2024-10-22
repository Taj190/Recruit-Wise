import express from 'express';
import { upload } from '../middleware/multer.js';
import { deleteApplicationsController, getApplicationsController, jobApplicationController } from '../controller/jobApplicationController.js';
import { isAdmin, isLoggedIn } from '../middleware/middle.js';
export const jobApplication = express.Router();

jobApplication.post('/application-submission' ,upload.single('cv') , jobApplicationController)
jobApplication.get('/get-applications' ,isLoggedIn,  isAdmin , getApplicationsController)
jobApplication.delete('/delete-job-application/:id' ,isLoggedIn,  isAdmin , deleteApplicationsController)

