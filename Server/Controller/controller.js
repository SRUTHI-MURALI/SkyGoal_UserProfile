import userSchema from "../Model/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../TokenGenerator/generateToken.js";
import generateOtp from "../OtpGenerator/generateOTP.js";
import verifyOtp from "../OtpGenerator/verifyOTP.js";

let globalData = {};

/**************************** User Register Send Otp *************************************/

const userRegisterSendOtp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const emailfind = await userSchema.findOne({ email });

    if (emailfind) {
      res.status(400).json(" email already existing");
    } else {
      const message = "Your OTP for email verification";
      const subject = "Email Authentication Otp";
      const otp = await generateOtp(email, message, subject, res);
      res.status(200).json({ message: "OTP sent successfully" });
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          res
            .status(500)
            .json("Some error occurred while hashing the password");
          return;
        }

        const newuser = {
          name: name,
          email: email,
          password: hash,
          phone: phone,
        };

        globalData.user = newuser;
        globalData.otp = otp;
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User Register Verify Otp *************************************/

const userRegisterVerifyOtp = async (req, res) => {
  try {
    const { verificationCode } = req.body;

    if (!verificationCode) {
      return res.status(400).json({ error: "Verification code is required" });
    }

    const otpResponse = await verifyOtp(verificationCode, globalData?.otp, res);

    if (!otpResponse) {
      return res.status(400).json({ message: "OTP verification failed" });
    }

    const newUser = await userSchema.create(globalData.user);
    globalData.user = null;
    globalData.otp = null;
    const token = generateToken(newUser._id);

    return res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      token,
    });
  } catch (error) {}
};

/**************************** User Login  *************************************/

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });

    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (isMatchPassword) {
        const token = generateToken(user._id);
        res.status(201).json({
          _id: user?._id,
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          token,
        });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**************************** User get Notes *************************************/

const userGetProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userSchema.find({ _id: id });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(500).json({ message: "no user to display" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User Update Profile *************************************/

const userUpdateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, password, gender, age, country } = req.body;

    const user = await userSchema.findById(id);

    if (user) {
      await userSchema.findByIdAndUpdate(
        id,
        {
          name,
          phone,
          email,
          password,
          gender,
          age,
          country,
        },
        { new: true }
      );

      const updatedUser = await userSchema.findById(id);

      res.status(200).json({ updatedUser });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User Update Profile Image *************************************/

const userUpdateProfileImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { photo } = req.body;

    const user = await userSchema.findById(id);

    if (user) {
      await userSchema.findByIdAndUpdate(
        id,
        {
          photo,
        },
        { new: true }
      );

      const updatedUser = await userSchema.findById(id);

      res.status(200).json({ updatedUser });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export {
  userRegisterSendOtp,
  userRegisterVerifyOtp,
  userLogin,
  userGetProfile,
  userUpdateProfile,
  userUpdateProfileImage,
};
