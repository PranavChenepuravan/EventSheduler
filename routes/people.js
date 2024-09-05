import express, { response } from 'express'
import User from '../models/user.js'
import Session from '../models/session.js'

const router=express.Router()

router.post('/session',async (req,res)=>{
    try{
        console.log(req.body)
        let newSession = new Session(req.body)
        console.log(newSession, 'new Session')
        let response=await newSession.save()
        console.log(response)
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
} )


export default router

