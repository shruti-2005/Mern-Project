const User = require ("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// *-------------------
// Home Logic
// *-------------------
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};

// *-------------------------------
//* User Registration Logic 📝
// *-------------------------------
// 1. Get Registration Data: 📤 Retrieve user data (username, email, password).
// 2. Check Email Existence: 📋 Check if the email is already registered.
// 3. Hash Password: 🔒 Securely hash the password.
// 4. Create User: 📝 Create a new user with hashed password.
// 5. Save to DB: 💾 Save user data to the database.
// 6. Respond: ✅ Respond with "Registration Successful" or handle errors.

const register = async (req, res) => {
  try {
    // const data = req.body;
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

   

    
    const token = await userCreated.generateToken();
    console.log("About to send 201 response", { token, userId: userCreated._id.toString() });
    res.status(201).json({
      msg: "Registration Successful",
      token,
      userId: userCreated._id.toString(),
    });
    console.log(userCreated);
  } catch (error) {
    console.log("Error in register controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//User Login Logic

const login = async (req, res ,next) => {
  try {
    const { email, password } = req.body;
    //check user exist
    

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ message: "Invalid credentials"});
    }

    //compare password

    // const user = await bcrypt.compare(password, userExist.password);

    const user = await userExist.comparePassword(password);

    if(user){
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    }
    else{
      res.status(401).json({ message: "Invalid credentials"});
    }



  }catch (error) {
   // res.status(500).json("Internal server error" );

   next(error);
  }
};

//User Logic - to send user data

const user =async (req,res) =>{
  try{
    const userData = req.user;
    console.log(userData);
    res.status(200).json({userData})

  }catch(error){
    console.log(`error from the user route ${error}`);
  }

}


module.exports = { home, register,login ,user};