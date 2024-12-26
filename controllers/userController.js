const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
const userModel = require("../models/userModel")









// register user 

exports.register=async(req,res)=>{


    const {name,email,password} = req.body 

    try{const existingUser = await userModel.findOne({email})

    if(existingUser){
        return res.status(404).json({message:"User Already Exist",success:false})
    }


    const hashedPass = await bcrypt.hash(password,10) 

    const newUser = await userModel({
        name,email,password:hashedPass
    })


    await newUser.save()


    res.json({success:true,message:"new user register successfully",newUser})}

    catch(error){
        res.status(404).json({message:"register api failed"})
    }

    
    

    

}



// user login 


exports.login=async(req,res)=>{
    
    const {email,password} = req.body

    try{const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({success:false,message:"user not found or incorrect email"})
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
         return res.status(404).json({message:"invalid credentials"})
    }

    const token = jwt.sign({
        userId:user._id
    },process.env.JWTKEY)

    res.status(200).json({message:"login success",success:true,token})}

    catch(error){
        res.status(404).json({message:"login api faild"})
    }

 }