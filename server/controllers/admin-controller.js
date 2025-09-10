const User = require("../models/user-model");
const Contact = require("../models/contact-model");

const getAllUsers = async(req,res,next) =>{
  try {
    const users = await User.find({},{password:0}); //will not get password
    console.log(users)
    if(!users || users.length === 0){
      return res.status(404).json( {message :"No Users Found"});
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}


//single user logic
const getUserById =async (req,res,next) =>{
    try {
         const id = req.params.id;
         const data=await User.findOne({_id:id},{password:0});
         return res.status(200).json(data);
      }
      
     catch (error) {
      next(error);
    }
}


//update user logic

const updateUserById = async(req,res,next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updateData = await User.updateOne({_id:id},{
      $set:updatedUserData,
    });

    return res.status(200).json(updateData);

  } catch (error) {
    next(error);
  }
}

//delete user
const deleteUserById =async (req,res,next) =>{
    try {
      const id = req.params.id;
      await User.deleteOne({_id:id});
     return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
       next(error);
    }
}

//getAllContacts Logic

const getAllContacts = async(req,res,next)=>{
  try {
     const contacts = await Contact.find();
     console.log(contacts)

     if(!contacts || contacts.length === 0){
      return res.status(404).json({message:"No contact found"});
     }

     return res.status(200).json(contacts);
    
  } catch (error) {
    next(error);
    }
}


// Delete contact by ID
const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Contact.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};


module.exports = {getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById, deleteContactById,};