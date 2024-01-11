import express from 'express'
import dotenv from "dotenv";
dotenv.config();
import connectDB from './config/db.js';


const app = express()






app.listen(process.env.PORT, () =>{
    connectDB()
    console.log(`server running on ${process.env.PORT}`)
})