import mongoose from "mongoose";

//user schema 

const userSchema = new mongoose.Schema({
    //all the fields are required
    username: {
        type: String,
        required: true,
        unique: true//username should be unique
    },
    email: {
        type: String,
        required: true,
        unique: true//email should be unique
    },
    password: {
        type: String,
        required: true
    }
},
{timestamps: true}//to know when the user is created
);

const User = mongoose.model("User", userSchema);

export default User;