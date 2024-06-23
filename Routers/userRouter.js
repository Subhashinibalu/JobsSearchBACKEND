import express from 'express';
import { deleteUser, updateUser } from '../Controllers/userController.js';
import { verifyToken } from "../Middleware/verifyToken.js";
const userRouter = express.Router();

userRouter.delete('/delete/:id',deleteUser)//route to delete user account
userRouter.put('/update/:id/:token',verifyToken,updateUser)//to update user details
export default userRouter;