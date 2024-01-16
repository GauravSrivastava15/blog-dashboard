import express from 'express'
import { userSignIn, userSignUp } from './user.controller.js'
import { auth } from '../middleware/jwtAuth.js'

const router = express.Router()

router.post('/signup', userSignUp)
router.post('/signin', userSignIn)


export default router