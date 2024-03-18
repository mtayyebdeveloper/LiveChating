import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

const verifiedUserMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ massage: "token not provided" });
    }

    const userToken = token.replace("token", "").trim();
    const verifiedToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    if(!verifiedToken){
        res.status(401).json({ massage: "token not valid" });
    }
    const userData = await User.findOne({ phone: verifiedToken.phone }).select({
      password: 0,
    });
    req.user = userData;
    req.token = userToken;
    req.userID = userData._id;
    next();
  } catch (error) {
    res.status(401).json({ massage: "token m error" });
    next(error);
  }
};

export {verifiedUserMiddleware}
