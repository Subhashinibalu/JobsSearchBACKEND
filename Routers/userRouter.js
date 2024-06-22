import express from 'express';
import { deleteUser } from '../Controllers/userController.js';

const userRouter = express.Router();

userRouter.delete('/delete/:id',deleteUser)

export default userRouter;