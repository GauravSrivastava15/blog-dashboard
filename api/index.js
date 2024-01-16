import express from 'express'
import dotenv from "dotenv";
dotenv.config();
import connectDB from './config/db.js';
import userRouter from './user/user.routes.js'
import { appLevelErrorHandlerMiddleware } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/api/user', userRouter)



app.use(appLevelErrorHandlerMiddleware)


app.listen(process.env.PORT, () =>{
    connectDB()
    console.log(`server running on ${process.env.PORT}`)
})