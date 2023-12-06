import express from "express";
const userRouter = express.Router();

import { userLoggedIn } from "../Middleware/auth.js";
import {
  userRegisterSendOtp,
  userRegisterVerifyOtp,
  userLogin,
  userGetProfile,
  userUpdateProfile,
  userUpdateProfileImage,
} from "../Controller/controller.js";

/**************************** User Register  *************************************/
userRouter.post("/register", userRegisterSendOtp);
userRouter.post("/verifyOtp", userRegisterVerifyOtp);

/**************************** User Login  *************************************/
userRouter.post("/login", userLogin);

/**************************** User Note Management  *************************************/

userRouter.get("/getProfile/:id", userLoggedIn, userGetProfile);
userRouter.put("/editProfile/:id", userLoggedIn, userUpdateProfile);
userRouter.put("/editImage/:id", userLoggedIn, userUpdateProfileImage);

export default userRouter;
