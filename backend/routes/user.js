const express = require("express");
const router = express.Router();
const z = require('zod');
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {User} = require("../db");

const authMiddleware = require('../middleware');


const signUpBody = z.object({
    username:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string()
})

const signInBody = z.object({
    username:z.string().email(),
    password:z.string()
})

const updateBody = z.object({
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().optional()
})

router.post('/signup', async(req,res)=>{
    const {success} = signUpBody.safeParse(req.body)
    if(!success)
    {
        return res.status(400).json({
            message:"Email already taken/ Invalid inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(400).json({
            message:"Email already taken, Please Login"
        })
    }

    const user = await User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    });

    const userId = user._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        token:token,
        message:"User Created Successfuly"
    })
})

router.post('/signin', async(req, res)=>{
    const {success} = signInBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user)
    {
        const token = jwt.sign({
            userId:user._id,
        }, JWT_SECRET);
        res.json({
            token:token   
        })
    return;
    }

    return res.status(400).json({
        message:"Error while logging in"
    })
})


router.put('/', authMiddleware , async (req,res)=>{
    const{success} = updateBody.safeParse(req.body);
    if(!success)
    {
        res.status(400).json({
            message:"Error while updating information"
        })
    }

    await User.updateOne({_id:req.userId}, req.body);

    res.status(200).json({
        message:"Updated Successfully"
    })
})

router.get('/bulk', async(req,res)=>{
    const filter = req.query.filter || ""

    const users = await User.find({
        $or: [{
           firstName:{
            "$regex":filter
            },
           },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user: users.map(user=>({
            username: user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})


module.exports = router;