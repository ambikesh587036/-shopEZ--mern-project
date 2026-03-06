import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/User.js"

const router = express.Router()

router.post("/signup", async (req,res)=>{

const {name,email,password} = req.body

const hash = await bcrypt.hash(password,10)

const user = new User({
name,
email,
password:hash
})

await user.save()

res.json({message:"User registered"})
})

router.post("/login", async (req,res)=>{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){

return res.json({message:"User not found"})
}

const match = await bcrypt.compare(password,user.password)

if(!match){

return res.json({message:"Wrong password"})
}

const token = jwt.sign({id:user._id},"secretkey")

res.json({token})

})

export default router
