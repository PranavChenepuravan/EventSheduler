import mongoose from "mongoose";
import User from "./user.js";

let sheduleSchema= new mongoose.Schema(
    {
        userId:{
            type:mongoose.Types.ObjectId,
            ref:User
        },
        startingdttm:{
            type:Date
        },
        endingdttm:{
            type:Date
        },

    }
)

let Shedule = mongoose.model('shedule', sheduleSchema)
export default Shedule