import jobPost from "../Models/jobPostModel.js";

export const postJob = async (req, res) => {
   
   
    const {company,role,skills,location,salary,email} = req.body
    const newJob = new jobPost({company,role,skills,location,salary,email})
    try {
        const postedJob = await newJob.save();
        res.status(200).json({message:'Job Posted Successfully',result:postedJob})
    } catch (error) {
        res.status(500).json({message:'Internal Server Error',error:error.message})
    }
}
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobPost.find();
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({message:'Internal Server Error',error:error.message})
    }
}