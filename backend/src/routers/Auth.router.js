import express from "express";

import {
  HomeController,
  LoginController,
  SignupController,
  UserDataController,
} from "../controllers/Auth.controller.js";

import { verifiedUserMiddleware } from "../middlewares/Auth.middleware.js";

import validateMiddleware from "../middlewares/Validate.middleware.js";

import {
  signupValidator,
  loginValidator,
} from "../validations/zod.validation.js";

const AuthRouter = express.Router();

AuthRouter.route("/home").get(HomeController);

AuthRouter.route("/login").post(
  validateMiddleware(loginValidator),
  LoginController
);

AuthRouter.route("/signup").post(
  validateMiddleware(signupValidator),
  SignupController
);

AuthRouter.route("/user").post(verifiedUserMiddleware, UserDataController);

export default AuthRouter;
