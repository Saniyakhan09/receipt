
// const UserModel = require('../Model/auth.module') 
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
//  // register
//   async function Register(req,res){
//      const {username,password} = req.body; 
//      const isuserexist = await UserModel.findOne({username}) 
//      if(isuserexist){ return res.status(401).json({ message:"username already exixts" }) }
//       const user = await UserModel.create({ 
//         username, 
//         password: await bcrypt.hash(password,10)
//        }) 


//       // authentication 
// const token = jwt.sign({id:user._id,username: user.username }, process.env.JWT_SECRET,  { expiresIn: "1d" })  
//        res.cookie("token",token)
//         return res.status(201).json({ message:"user register", token }) }
        
//          // login 
// async function login(req,res){
//  const{username,password} = req.body; 
//  const user = await UserModel.findOne({username})
//  if(!user){ res.status(401).json({ message:"username not exist" }) } 
//  const ispasswordvalid = await bcrypt.compare(password,user.password)
// if(!ispasswordvalid){ 
//  res.status(401).json({ message:"password is not valid" }) } 
//    const token = jwt.sign({id:user._id, username: user.username },process.env.JWT_SECRET,  { expiresIn: "1d" }) 
//      res.cookie('token',token,{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) 
//    res.status(201).json({ message:"login sucessfully", token, data:user }) }
   
// module.exports = {Register,login};

const UserModel = require('../Model/auth.module');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ---------------- Register ----------------
async function Register(req, res) {
  try {
    const { username, password } = req.body;

    const isUserExist = await UserModel.findOne({ username });
    if (isUserExist) {
      return res.status(401).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 👇 Cookie set with proper options
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,   // local development → false, production (https) → true
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(201).json({ message: "User registered", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ---------------- Login ----------------
async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Username does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password is not valid" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 👇 Cookie set with same options
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful",userId:user._id, token, data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { Register, login };
