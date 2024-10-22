import express from 'express';
import { IsEmailVaild, ValidateMessage } from '../middleware/middle.js';
import { EmployerFormController } from '../controller/employerController.js';
export const employerRequest = express.Router();

employerRequest.post('/employer-request', IsEmailVaild , ValidateMessage, EmployerFormController )