import express from "express";
import authRouter from "./auth.router.js";
import bookRouter from "./book.router.js";

const customRoutes = express.Router();

customRoutes.use("/auth", authRouter);
customRoutes.use("/book", bookRouter);

export default customRoutes;
