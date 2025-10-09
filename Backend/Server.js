const express = require('express')
require('dotenv').config()

const app = require('./src/app');
const Connectdb = require('./src/db/db');


Connectdb();

const PORT = process.env.PORT || 3000;;


app.listen(PORT, (req,res) => {
  console.log(`Server is running on port 5176 ${PORT}`);
});
