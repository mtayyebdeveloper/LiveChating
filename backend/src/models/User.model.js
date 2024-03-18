import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    userImage: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// passwords bcrypt to secure..................
userSchema.pre("save", async function bcryptPassword(next) {
  if (!this.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, saltRound);
    this.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

// compare passwords.....................
userSchema.methods.comparePassword = async function (password, next) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    next(error);
  }
};

userSchema.methods.genarateToken = async function (next) {
  try {
    jwt.sign(
      {
        userID: this._id.toString(),
        phone: this.phone,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    next(error);
  }
};

export const User = mongoose.model("User", userSchema);
