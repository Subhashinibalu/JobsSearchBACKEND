import express from 'express';
import { deleteUser, updateUser, userApplication } from '../Controllers/userController.js';
import { verifyToken } from "../Middleware/verifyToken.js";
const userRouter = express.Router();

userRouter.delete('/delete/:id',deleteUser)//route to delete user account
userRouter.put('/update/:id/:token',verifyToken,updateUser)//to update user details
userRouter.put('/application/:id/:token',userApplication)
export default userRouter;