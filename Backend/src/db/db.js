const mongoose = require('mongoose') 
// require("dotenv").config(); 
const Connectdb = ()=>{ mongoose.connect(process.env.MONGO_URL)
.then(()=>{ console.log("connected to db") }) }


 module.exports = Connectdb