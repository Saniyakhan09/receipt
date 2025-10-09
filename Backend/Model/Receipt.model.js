const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  

  ReceiptNumber: {
    type:String,
    required: true,
    // unique:true
  },
  date:{
    type: String,
    required:true,
  },
   category:{
    type:String
   },
  amount: {
    type: Number,
    required: true
  },
  status:{
    type:String,
  },
  image:{
    type:String
  },

  user:{
    type: mongoose.Schema.Types.ObjectId, 
    ref:"User",
  }
});


const Receipt_Model = mongoose.model("Receipt", ReceiptSchema);

module.exports = Receipt_Model;
