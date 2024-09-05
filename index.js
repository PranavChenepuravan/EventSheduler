import express from 'express'
import mongoose from 'mongoose'
const app=express()
import cors from 'cors'
mongoose.connect('mongodb://127.0.0.1:27017/EventShedule')
.then(()=> console.log('Connected !'));

import commonRouter from './routes/common.js'
import peopleRouter from './routes/people.js'
import adminRouter from './routes/admin.js'

app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json())
app.use('/common',commonRouter)
app.use('/people',peopleRouter)
app.use('/admin',adminRouter)


app.listen(5000)