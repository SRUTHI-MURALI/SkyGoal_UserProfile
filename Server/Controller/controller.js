import userSchema from "../Model/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../TokenGenerator/generateToken.js"
import generateOtp from "../OtpGenerator/generateOTP.js"
import verifyOtp from "../OtpGenerator/verifyOTP.js"

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
  
      const notesFind = await noteSchema.find({ author: id });
  
      if (notesFind) {
        res.status(200).json({ notesFind });
      } else {
        res.status(500).json({ message: "no notes to display" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  /**************************** User get edit Notes *************************************/
  
  const userGetEditProfile = async (req, res) => {
    try {
      const { id } = req.params;
  
      const notesFind = await noteSchema.find({ _id: id });
  
      if (notesFind) {
        res.status(200).json({ notesFind });
      } else {
        res.status(500).json({ message: "no notes to display" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  /**************************** User Update Notes *************************************/
  
  const userUpdateProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, summary, content } = req.body;
  
      const notesFind = await noteSchema.findById(id);
  
      if (notesFind) {
        await noteSchema.findByIdAndUpdate(id, {
          title,
          summary,
  
          content,
        });
  
        const updatedNote = await noteSchema.findById(id);
  
        res.status(200).json({ updatedNote });
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
export { userRegisterSendOtp, userRegisterVerifyOtp, userLogin ,userGetProfile,userGetEditProfile,userUpdateProfile};
