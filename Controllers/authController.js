import User from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

//for user registration purposes
export const registerUser = async (req, res, next) => {
  try {
    //storing the usename,email and password from the user in their respective variables
    const { username, email, password } = req.body;
    // const existingUser = await findOne({username})
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
    res.status(500).json({ message: error.message });
  }
};

//For user login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetail = await User.findOne({ email });
    if (!userDetail) {
      return res.status(401).json({ message: "User not found" });
    }
    //comparing the password with the hashed password in the database
    const passwordMatch = await bcryptjs.compare(password, userDetail.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    //jwt part token creation after signin
    const token = jwt.sign(
      { _id: userDetail._id, isAdmin: userDetail.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    userDetail.token = token;
    await userDetail.save();

    const { password: passkey, ...rest } = userDetail._doc;

    //token is send to frontend with the message
    res
      .status(200)
      .json({
        message: "User Logged In Successfully",
        token: token,
        rest: rest,
      });
  } catch (error) {
    
    res.status(500).json({ message: "Login Failed Internal server error",error: error });
  }
};

//for forgot password

export const forgotPassword = async (req, res) => {
  //getting mail from the user
  const { email } = req.body;
  const user = await User.findOne({ email }); //finding the user using the email
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  //creating a new token for the user
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  //creating a nodemailer transporter for sending email
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.PASSMAIL,
      pass: process.env.PASSKEY,
    },
  });

  //creating the email with subject and mail body

  var mailOptions = {
    from: process.env.PASSMAIL,
    to: user.email,
    subject: "JobSearch-Password Reset ",
    text:
      "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
      `http://localhost:5173/resetpassword/${user._id}/${token}`,
    //sending the mail with reset password link along with newly created token and user id
  };
  //sending the mail using the nodemailer transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      
      res
        .status(500)
        .json({ message: "Internal server error in sending the mail" ,error: error });
    } else {
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
};

//reset password
export const resetPassword = async (req, res) => {
  try {
    //the token recieved as params is decoded and stored i
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET_KEY
    );
    //if the token is invalid error message is returned
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }
    //checking whether the user exists
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //hashing the newpassword and replacing the old password with the new password
    const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
