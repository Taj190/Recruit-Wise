import express from 'express';
import { upload } from '../middleware/multer.js';
import { dataSubmissionController } from '../controller/dataSubmissionController.js';
export const uploadData = express.Router();

uploadData.post('/data-submission' ,upload.single('cv') , dataSubmissionController)



