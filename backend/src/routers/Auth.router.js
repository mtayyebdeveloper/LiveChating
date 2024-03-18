import express from 'express'
import { HomeController } from '../controllers/Auth.controller.js'

const AuthRouter = express.Router()
AuthRouter.route('/home').get(HomeController)

export default AuthRouter