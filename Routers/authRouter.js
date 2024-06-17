import express from 'express';
import { loginUser, registerUser } from '../Controllers/authController.js';


const router = express.Router();

router.post('/register',registerUser) //route to register newuser
router.post('/login',loginUser)//route for login existing user

export default router;