import { User } from "../models/User.model.js";

const HomeController = async (req, res) => {
  res.status(200).send("Home is ready...........");
};

const SignupController = async (req, res) => {
  try {
    const clienData = req.body;

    if (!clienData) {
      return res.status(201).json("user data not found...");
    }

    const userExist = await User.findOne({ phone: clienData.phone });

    if (userExist) {
      console.log("user already bangaya hai");
      return res.status(401).json({ userexist: "User alredy exist." });
    } else {
      await User.create(clienData);
      console.log("user ban gaya");
      return res.status(200).json({
        massage: "User created successfully.",
      });
    }
  } catch (error) {
    return res.status(401).json({ "signup controller error:": error });
  }
};

const LoginController = async (req, res) => {
  try {
    const { password, phone } = req.body;

    const isPhoneMatch = await User.findOne({ phone: phone });

    if (!isPhoneMatch) {
      return res.status(201).json({ massage: "envalid phone number." });
    }

    const isPasswordMatch = isPhoneMatch.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(201).json({ massage: "envalid password." });
    }

    console.log("login success");
    return res.status(200).json({
      massage: "login success",
      jsonWebToken: await isPhoneMatch.genarateToken(),
      userID: isPhoneMatch._id.toString(),
    });
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
