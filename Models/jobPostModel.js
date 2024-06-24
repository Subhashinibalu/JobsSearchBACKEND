import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    skills:[String],
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
},{timestamps: true})


const Jobs = mongoose.model("Jobs", jobPostSchema);

export default Jobs;