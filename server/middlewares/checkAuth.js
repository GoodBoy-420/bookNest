import "dotenv/config";
import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  if (
    req.path === "/" ||
    req.path === "/api/v1/auth/refresh-token" ||
    req.path === "/api/v1/auth/register" ||
    req.path === "/api/v1/auth/login" ||
    req.path === "/api/v1/auth/email-verify" ||
    req.path.startsWith("/api/v1/auth/otp-verify") ||
    req.path.startsWith("/api/v1/auth/reset-password")
  ) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // const token = req.cookies.token;

  if (!token) {
    throw new Error("Token not found");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid Token" }); // Forbidden
    }

    if (decoded.type !== "access") {
      return res.status(403).json({ error: "Invalid Token Type" }); // Forbidden
    }

    req.claims = decoded;
    next();
  });
};

export default checkAuth;
