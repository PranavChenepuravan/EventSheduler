import express, { response } from 'express'
import User from '../models/user.js'

const router=express.Router()

router.post('/register',async (req,res)=>{
    try{
        console.log(req.body)
        let newUser = new User(req.body)
        console.log(newUser, 'new User')
        let response=await newUser.save()
        console.log(response)
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
} )

router.post('/login',async (req,res)=>{
    console.log(req.body);
    const{email,password}=req.body
    console.log(email,'dc')
    let user=await User.findOne({email:email,password:password})
    if(!user){
        return res.status(402).json('invalid username or password')
    }
    console.log(user);
    res.json(user)
})





export default router

