import express from 'express';
import { forgotPassword, loginUser, registerUser, resetPassword } from '../Controllers/authController.js';


const router = express.Router();

router.post('/register',registerUser) //route to register newuser
router.post('/login',loginUser)//route for login existing user
router.post('/forgot-password',forgotPassword)//route for forgot password 
router.post('/reset-password/:id/:token',resetPassword)//route for reset password
export default router;