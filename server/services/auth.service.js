import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { sendEmail } from "../libs/sendEmail.js";
import { UserModel } from "../models/user.model.js";
import getNewToken from "../utils/getNewToken.js";

export const register = async (req) => {
  const data = req.body;

  const existingUser = await UserModel.findOne({ email: data.email });

  if (existingUser) {
    throw new Error("User alrday exist with this mail. Try with a new one");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  data.password = hashedPassword;

  const newUser = await UserModel.create(data);

  newUser.password = undefined;

  return newUser;
};

export const login = async (email, password) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User not found with this mail.");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Incorrect password");
  }

  const token = await getNewToken(user);

  user.password = undefined;

  return { user, token };
};

export const refreshToken = async (refreshToken) => {
  const decoded = await jwt.verify(refreshToken, config.jwt.refresh_secretKey);

  if (!decoded) {
    throw new Error("Invalid refresh token");
  }

  const user = await UserModel.findById(decoded.id);

  if (!user) {
    throw new Error("User not found");
  }

  const token = getNewToken(user);

  return token;
};

export const emailVerify = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("User not found with this mail.");
  }
  const code = String(Math.floor(100000 + Math.random() * 900000));

  await UserModel.updateOne({ email }, { otp: code });

  await sendEmail(email, "OTP Verification", `Your OTP code is ${code}`);

  return { Message: "OTP sent to your mail" };
};

export const otpVerify = async (email, code) => {
  const user = await UserModel.findOne({ email, otp: code });
  if (!user) throw new Error("OTP does not matched");

  return { message: "OTP verified successfully." };
};

export const resetPassword = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found.");

  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.updateOne({ email }, { password: hashedPassword, otp: 0 });

  return { message: "Password changed successfully." };
};
