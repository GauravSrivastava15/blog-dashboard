import express from 'express'
import dotenv from "dotenv";
dotenv.config();
import connectDB from './config/db.js';
import userRouter from './user/user.routes.js'

const app = express()


app.use('/api/user', userRouter)



app.listen(process.env.PORT, () =>{
    connectDB()
    console.log(`server running on ${process.env.PORT}`)
})