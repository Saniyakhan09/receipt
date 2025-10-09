const receiptRoutes = require('../Routes/receipt.routes');
const authRoutes = require('../Routes/auth.routes')
const express = require('express');
const cookieParser = require("cookie-parser");
const path = require('path')
const cors = require('cors')
const app = express();

const corsOptions = {
  origin:"http://localhost:5173",
  methods:"GET, POST, PUT, DELETE, HEAD",
  credentials: true
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());
app.use('/receipt', receiptRoutes);
app.use('/user', authRoutes);
app.use(express.static(path.join(__dirname, '../public')));
app.get(".*",(req,res)=>{
  res.sendFile(path.join(__dirname, '../public/index.html'))
})
module.exports = app;
