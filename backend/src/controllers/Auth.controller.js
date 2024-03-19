import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";

const HomeController = async (req, res) => {
  res.status(200).send("Home is ready...........");
};

const SignupController = async (req, res) => {
  try {
    const clienData = req.body;

    if (!clienData) {
      return res.status(201).json("user data not found...");
    }
    
    const phoneExist = await User.findOne({
      phone: clienData.phone,
    });

    const emailExist = await User.findOne({
      email: clienData.email,
    });

    if (phoneExist || emailExist) {
      console.log("user already bangaya hai");
      return res.status(401).json({ massage: "User alredy exist." });
    } else {
      await User.create(clienData);
      console.log("user ban gaya");
      return res.status(200).json({
        massage: "User created successfully.",
      });
    }
  } catch (error) {
    return res.status(401).json({ "signup": error });
  }
};

const LoginController = async (req, res) => {
  try {
    const { password, phone } = req.body;

    const isPhoneMatch = await User.findOne({ phone });

    if (!isPhoneMatch) {
      return res.status(201).json({ error: "Wrong phone number." });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isPhoneMatch.password
    );

    if (isPasswordMatch) {
      console.log("login success");
      return res.status(200).json({
        massage: "login success",
        jsonWebToken: await isPhoneMatch.genarateToken(),
        userID: isPhoneMatch._id.toString(),
      });
    } else {
      return res.status(201).json({ error: "Wrong password." });
    }
  } catch (error) {
    return res.status(401).json({ "login controller error:": error });
  }
};

const UserDataController = async (req, res) => {
  try {
    const allUserData = req.user;

    return res.status(200).json({ allUserData });
  } catch (error) {
    return res.status(401).json({ "userdata controller error:": error });
  }
};

export {
  HomeController,
  SignupController,
  LoginController,
  UserDataController,
};
