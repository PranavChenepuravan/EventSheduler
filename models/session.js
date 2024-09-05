import mongoose from "mongoose";
import User from "./user.js";

let sessionSchema= new mongoose.Schema(
    {
        userId:{
            type:mongoose.Types.ObjectId,
            ref:User
        },
        startdate:{
            type:Date
        },
        enddate:{
            type:Date
        },

    }
)

let Session = mongoose.model('session', sessionSchema)
export default Session