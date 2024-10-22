import express from 'express';
import {loginController, logOutController, registerController} from '../controller/registerController.js'
import { isAdmin, isLoggedIn } from '../middleware/middle.js';
export const authentication = express.Router()

// Route to register a new user
authentication.post('/register', registerController)
authentication.post('/login', loginController)
authentication.delete('/logout', isLoggedIn, isAdmin ,logOutController )
authentication.get('/auth/me', isLoggedIn, (req, res) => {
    res.json(req.user); 
  });