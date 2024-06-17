import User from "../Models/userModel.js";
import { errorHandler } from "../Utils/Error.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
export const registerUser = async (req, res, next) => {

 
    try {
       //storing the usename,email and password from the user in their respective variables
    const { username, email, password } = req.body;
    //validation
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return next(errorHandler(400, "All the Fields Are Required"));
      //errorHandler CALL with parameters
    }

    //hashing the password using bcryptjs
        const hashedPassword = bcryptjs.hashSync(password, 10);
  //storing the username,email and hashed password in the newUser (collection)
    const newUser = new User({ username, email, password: hashedPassword });
      //saving the newUser in the database
      await newUser.save();
      res
        .status(200)
        .json({ message: "User Registered Successfully", result: newUser });
    } catch (error) {
      next(error);

    }
  };
  

  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userDetail = await User.findOne({ email });
      if (!userDetail) {
        return next(errorHandler(401, "User not found"))
      }
      const passwordMatch = await bcryptjs.compare(password, userDetail.password);
      if (!passwordMatch) {
        return next(errorHandler(401, "Invalid password"));;
      }
      //jwt part token creation after signin
    const token = jwt.sign(
      { _id: userDetail._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    
      await userDetail.save();
  
      res.status(200).json({ message: "User Logged In Successfully",result:userDetail });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Login Failed Internal server error" });
    }
  };