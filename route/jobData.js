import express from 'express';
import { isAdmin, isLoggedIn } from '../middleware/middle.js';
import { deleteUserDataController, editUserDataController, getUserDataController } from '../controller/jobController.js';
export const job = express.Router();

job.get('/userData' ,isAdmin , getUserDataController)
job.delete('/userdata/:id', isLoggedIn,isAdmin,deleteUserDataController)
job.put('/edituserdata/:id', isLoggedIn,isAdmin,editUserDataController)

