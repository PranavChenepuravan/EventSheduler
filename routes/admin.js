import express from 'express'
import User from '../models/user.js'
import Session from '../models/session.js'
import Shedule from '../models/shedule.js'

const router = express()

router.get('/session', async (req, res) => {
    try {
        let response = await Session.aggregate([
            {
                $lookup: {
                    from: "users", // The collection name in MongoDB
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails" // The field name where the user data will be added
                }
            },
            {
                $unwind: "$userDetails" // Unwind the array to simplify the structure
            },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    startdate: 1,
                    enddate: 1,
                    "userDetails.name": 1, // Select specific fields from the userDetails
                    "userDetails.email": 1
                }
            }
        ]);
        console.log(response);
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});


router.post('/shedule',async (req,res)=>{
    try{
        console.log(req.body)
        let newShedule = new Shedule(req.body)
        console.log(newShedule, 'new Shedule')
        let response=await newShedule.save()
        console.log(response)
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
} )


export default router