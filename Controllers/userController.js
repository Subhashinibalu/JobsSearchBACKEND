import User from "../Models/userModel.js";


export const deleteUser = async (req, res) => {
    
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json( {message:'User deleted successfully'} );
    } catch (error) {
        res.status(500).json( {message:'Internal Servor error'} );
    }
  };