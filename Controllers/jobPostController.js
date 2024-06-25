import jobPost from "../Models/jobPostModel.js";
import User from "../Models/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

//job posting logic
export const postJob = async (req, res) => {
  const { company, role, skillsRequired, location, salary, link, email } =
    req.body;
  const newJob = new jobPost({
    company,
    role,
    skillsRequired,
    location,
    salary,
    link,
    email,
  });
  try {
    const postedJob = await newJob.save();

    res
      .status(200)
      .json({ message: "Job Posted Successfully", result: postedJob });

    const html = postedJob.skillsRequired.includes("HTML");
    const css = postedJob.skillsRequired.includes("CSS");
    const javascript = postedJob.skillsRequired.includes("JavaScript");
    const mongodb = postedJob.skillsRequired.includes("MongoDB");
    const mysql = postedJob.skillsRequired.includes("MySQL");
    const ds = postedJob.skillsRequired.includes("DataStructure");
    const java = postedJob.skillsRequired.includes("Java");
    const python = postedJob.skillsRequired.includes("Python");
    const c = postedJob.skillsRequired.includes("C++");

    const user = await User.find();

    //sending mails only to the users who has skills matching the skills required for the job
    user.map((user) => {
      const userhtml = user.skills.includes("HTML");
      const usercss = user.skills.includes("CSS");
      const userjavascript = user.skills.includes("JavaScript");
      const usermongodb = user.skills.includes("MongoDB");
      const usermysql = user.skills.includes("MySQL");
      const userds = user.skills.includes("DataStructure");
      const userjava = user.skills.includes("Java");
      const userc = user.skills.includes("C++");
      const userpython = user.skills.includes("Python");

      if (
        (userhtml && html) == true ||
        (usercss && css) == true ||
        (userjavascript && javascript) == true ||
        (usermongodb && mongodb) == true ||
        (usermysql && mysql) == true ||
        (userds && ds) == true ||
        (userjava && java) == true ||
        (userc && c) == true ||
        (userpython && python) == true
      ) {
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
          subject: "New Job Posted",
          text: `Hello ${user.username}!
                    We have come up with new job. That ${postedJob.company} has posted a new job for the role of ${postedJob.role}. We find your skills match this role.To know more about the job check your JobSearch App Job recommendations or you can visit the company's website.
                    Grab the opportunity!`,
          //sending the mail to the users with matching skills
        };
        //sending the mail using the nodemailer transporter
        transporter.sendMail(mailOptions);
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobPost.find();
    console.log(jobs);

    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
