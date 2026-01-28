import "dotenv/config";
import jwt from "jsonwebtoken";

const getNewToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      type: "access",
    },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      type: "refresh",
    },
    process.env.REFRESH_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    }
  );
  if (!token && !refreshToken) {
    throw new Error("Token no generated");
  }
  return { token, refreshToken };
};

export default getNewToken;
