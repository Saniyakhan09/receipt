const uploadfile = require('../src/service/storage.service')
const {v4: uuidv4} = require('uuid')
const Receipt_Model = require('../Model/Receipt.model');
const express = require('express');
const { ObjectId } = require('mongoose').Types;
//  Create receipt
async function createReceipt(req, res) {
  const file = req.file
  console.log("file received",file)
  try {
    const uploadImage = await uploadfile(file.buffer, `${uuidv4()}`);
    const { ReceiptNumber, amount, date, category, status,image, user} = req.body;

    const receipt = await Receipt_Model.create({
      ReceiptNumber,
      amount,
      date,
      category,
      status,
      image: uploadImage ? uploadImage.url : null,
      user:req.user._id || req.user._id
      //  user: req.user._id 

    });
     

    res.status(201).json({
      message: "Receipt created successfully",
      data: receipt
      
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getReceipts(req, res) {
  try {
      //  const userId = req.user._id; 
    const receipts = await Receipt_Model.find({ userId: req.user._id });
    res.status(200).json({
      message: "All receipts fetched",
      data: receipts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getuserreceipt(req, res) {
  try {
    const { userId } = req.params;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const receipts = await Receipt_Model.find({ user: userId });

    if (!receipts || receipts.length === 0) {
      return res.status(404).json({ error: 'No receipts found for this user' });
    }

    if (userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.status(200).json(receipts);
  } catch (error) {
    console.error('Error fetching receipts:', error.message);
    res.status(500).json({ error: 'Failed to fetch receipts' });
  }
}



async function getPaid(req, res) {
  try {
    const{userId} = req.params
    const paidReceipts = await Receipt_Model.find({ user: userId, status:"paid"});

    const total = paidReceipts.reduce((acc, receipt) => acc + receipt.amount, 0);

    res.status(200).json({ totalPaid: total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
//get unpaid
async function getUnpaid(req,res){
      const{userId} = req.params

  const unpaid = await Receipt_Model.find({user: userId,status:"unpaid" });
  const total = unpaid.reduce((acc,receipt) => acc + receipt.amount,0);
  res.status(200).json({totalUnpaid: total});
}
// get Pending
async function getPending(req,res){
        const{userId} = req.params

  const pending = await Receipt_Model.find({user: userId, status:"pending"});
  const total = pending.reduce((acc,receipt)=>acc + receipt.amount,0);
    res.status(200).json({totalPending: total});

}


async function deleteReceipt(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Receipt_Model.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Receipt not found" });
    }

    res.status(200).json({
      message: "Receipt deleted",
      data: deleted
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { createReceipt, getReceipts, getuserreceipt,deleteReceipt,getPaid,getUnpaid,getPending };
