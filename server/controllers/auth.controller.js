import * as AuthServices from "../services/auth.service.js";

export const register = async (req, res) => {
  if (!req?.body?.name || !req?.body?.email || !req?.body?.password) {
    throw new Error("Please provide name, email and password");
  }

  const result = await AuthServices.register(req);

  res.status(201).send({
    success: true,
    data: result,
  });
};

export const login = async (req, res) => {
  if (!req?.body?.email || !req?.body?.password) {
    throw new Error("Please provide email and password");
  }
  const { email, password } = req.body;
  const result = await AuthServices.login(email, password);

  res.status(200).send({
    success: true,
    data: result,
  });
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body || "";

  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }

  const result = await AuthServices.refreshToken(refreshToken);

  res.status(200).send({
    seuccess: true,
    data: result,
  });
};

export const emailVerify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new Error("Please provide your email");
  }

  const result = await AuthServices.emailVerify(email);

  res.status(200).send({
    success: true,
    result,
  });
};

export const otpVerify = async (req, res) => {
  const email = req.query.email;
  const { code } = req.body;

  if (!code) {
    throw new Error("Please provide OTP code");
  }

  const result = await AuthServices.otpVerify(email, code);

  res.status(200).send({
    success: true,
    result,
  });
};

export const resetPassword = async (req, res) => {
  const email = req.query.email;
  const { password } = req.body;
  const result = await AuthServices.resetPassword(email, password);

  res.status(200).send({
    success: true,
    result,
  });
};
