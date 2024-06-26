//import
import User from "../Models/userModel.js";
import jobPost from "../Models/jobPostModel.js";

//update user data logic
export const updateUser = async (req, res) => {
const token = req.params.token;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          about: req.body.about,
          ugdegree: req.body.ugdegree,
          ugcourse: req.body.ugcourse,
          ugpercentage: req.body.ugpercentage,
          pgdegree: req.body.pgdegree,
          pgcourse: req.body.pgcourse,
          pgpercentage: req.body.pgpercentage,
          skills: req.body.skills,
          expectingSalary: req.body.expectingSalary,
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          streetaddress:req.body.streetaddress,
          city:req.body.city,
          region:req.body.region,
          postalcode:req.body.postalcode,

          
        },
      },
      { new: true }
    );
    
    const rest  = updatedUser._doc;
    res.status(200).json({ message: "User Updated Successfully",token: token,rest:rest });
  } catch (error) {
    
    res.status(500).json({ message: "Updation Failed Internal server error" });
    
  }
};


//deleteuser logic
export const deleteUser = async (req, res) => {
    
    try {
      //using the user id from the request parameters the user is find and deleted
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json( {message:'User deleted successfully'} );
    } catch (error) {
        res.status(500).json( {message:'Internal Servor error'} );
    }
  };



  //jobs applied

  export const userApplication = async (req, res) => {
    try {
      
      const updatedUser = await User.updateOne({token:req.params.token},
        { $push:
          {
         applications:req.params.id
          }
       }

      )

      const rest  = await User.findOne({token:req.params.token})
      console.log(rest);
      res.status(200).json({ message: "User Updated Successfully",rest:rest });

    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }