import config from "../configs/config.js";
import * as AuthServices from "../services/auth.service.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all details",
    });
  }

  const result = await AuthServices.register(name, email, password);

  res.status(201).send({
    success: true,
    data: result,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }
  const result = await AuthServices.login(email, password);

  // Set refresh token in httpOnly cookie
  res.cookie("refreshToken", result.token.refreshToken, {
    httpOnly: true,
    secure: config.cookie.secure,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).send({
    success: true,
    data: {
      user: result.user,
      accessToken: result.token.token,
    },
  });
};

const refreshToken = async (req, res) => {
  console.log(req.cookies);

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(404).json({
      success: false,
      message: "Refresh Token not found",
    });
  }

  const result = await AuthServices.refreshToken(refreshToken);

  console.log(result);

  res.status(200).send({
    seuccess: true,
    data: {
      accessToken: result.token.token,
      user: result.user,
    },
  });
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.cookie.secure,
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

const emailVerify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please provide email.",
    });
  }

  const result = await AuthServices.emailVerify(email);

  res.status(200).send({
    success: true,
    result,
  });
};

const otpVerify = async (req, res) => {
  const email = req.query.email;
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Please provide OTP",
    });
  }

  const result = await AuthServices.otpVerify(email, code);

  res.status(200).send({
    success: true,
    result,
  });
};

const resetPassword = async (req, res) => {
  const email = req.query.email;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Please provide password",
    });
  }

  const result = await AuthServices.resetPassword(email, password);

  res.status(200).send({
    success: true,
    result,
  });
};

export {
  emailVerify,
  login,
  logout,
  otpVerify,
  refreshToken,
  register,
  resetPassword,
};
