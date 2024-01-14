import express from 'express'
import mongoose from 'mongoose'
import { userSignUpRepo, userSingInRepo } from './user.repository'
import bcrypt from 'bcrypt'

export const userSignUp = async (req, res) =>{
    const {password} = req.body
    password = await bcrypt.hash(password, 12)
    const resp = await userSignUpRepo({...req.body, password})
    if(resp.success){
        res.status(200).json({msg:"User created", res:resp.res})
    }else{
        res.status(500).send("user not created")
    }
}

export const userSignIn = async (req, res) =>{
    const resp = await userSingInRepo(req.body)
}