import express from "express";
const userRouter = express.Router();

import { userLoggedIn } from "../Middleware/auth.js"
import {
  userRegisterSendOtp,
  userRegisterVerifyOtp,
  userLogin,userGetProfile,userGetEditProfile,userUpdateProfile
} from "../Controller/controller.js"




/**************************** User Register  *************************************/
userRouter.post("/register", userRegisterSendOtp);
userRouter.post("/verifyOtp", userRegisterVerifyOtp);

/**************************** User Login  *************************************/
userRouter.post("/login", userLogin);

/**************************** User Note Management  *************************************/

userRouter.get("/getNotes/:id", userLoggedIn, userGetProfile);
userRouter.get("/getEditData/:id", userLoggedIn, userGetEditProfile);
userRouter.put("/editNote/:id", userLoggedIn, userUpdateProfile);


export default userRouter;
