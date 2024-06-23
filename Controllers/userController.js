//import
import User from "../Models/userModel.js";


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
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          streetaddress:req.body.streetaddress,
          city:req.body.city,
          region:req.body.region,
          postalcode:req.body.postalcode
          
        },
      },
      { new: true }
    );
    
    const rest  = updatedUser._doc;
    res.status(200).json({ message: "User Updated Successfully",token: token,rest:rest });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Updation Failed Internal server error" });
    
  }
};



export const deleteUser = async (req, res) => {
    
    try {
      //using the user id from the request parameters the user is find and deleted
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json( {message:'User deleted successfully'} );
    } catch (error) {
        res.status(500).json( {message:'Internal Servor error'} );
    }
  };