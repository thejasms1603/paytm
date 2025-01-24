const express = require("express");
const mongoose = require("mongoose");
const { z} = require("zod");
const router = express.Router();
const {authMiddleware} = require("../middleware");
const { Account } = require("../db");


//Checking Balance in DB
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});
//USING TRANSACTIONS IN DB
router.post('/transfer', authMiddleware, async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount, to} = req.body;

    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({userId:to}).session(session);

    if(!toAccount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid Account"
        });
    }
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.abortTransaction();
    res.json({
        message:"Transfer Successful"
    })
})

// BAD SOLUTION
// router.post('/transfer', authMiddleware, async(req,res)=>{
    // const {amount, to} = req.body;
    // const account = await Account.findOne({
    //     userId:req.userId
    // });

    // if(account.balance < amount){
    //     return res.status(411).json({
    //         message:"Insufficient Balance"
    //     })
    // } 

    // const toAccount = await Account.findOne({
    //     userId:to
    // });

    // if(!toAccount)
    // {
    //     res.status(411).json({
    //         message:"Invalid Account"
    //     })
    // }

    // await Account.updateOne(
    //   {
    //     userId: req.userId,
    //   },
    //   {
    //     $inc: {
    //       balance: -amount,
    //     },
    //   });

    // await Account.updateOne({
    //     userId:to
    // },{
    //     $inc:{
    //         balance:amount
    //     }
    // })

    // res.json({
    //     message:"Transfer Successful"
    // })
// })

module.exports = router;

