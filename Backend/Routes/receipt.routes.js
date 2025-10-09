
const express = require("express");
const multer = require('multer');
// const authMiddleware = require("../src/middleware/auth.middleware")                                                  
const  {createReceipt,getReceipts,getuserreceipt,deleteReceipt,getPaid,getUnpaid,getPending}  = require("../controller/receipt.controller");
const authMiddleware = require("../src/middleware/auth.middleware")
const Routes = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// create
Routes.post("/create",authMiddleware, upload.single("image"), createReceipt);

// Routes.get('/:id', authMiddleware, getuser );
// Routes.get('/userallreceipts', authMiddleware,getuserreceipt);
Routes.get('/userallreceipts/:userId', authMiddleware, getuserreceipt);

// // get all
Routes.get("/all", authMiddleware,getReceipts);
Routes.get("/paid/:userId",authMiddleware,getPaid);
Routes.get("/unpaid/:userId",authMiddleware,getUnpaid);
Routes.get("/pending/:userId",authMiddleware,getPending);
  
// delete
Routes.delete("/:id", deleteReceipt);

module.exports = Routes;
