import express from "express";
import authRouter from "./auth.router.js";
import bookRouter from "./book.router.js";
import cartRouter from "./cart.router.js";
import orderRouter from "./order.route.js";
import wishRouter from "./wishlist.route.js";

const customRoutes = express.Router();

customRoutes.use("/auth", authRouter);
customRoutes.use("/book", bookRouter);
customRoutes.use("/wish-list", wishRouter);
customRoutes.use("/cart", cartRouter);
customRoutes.use("/order", orderRouter);

export default customRoutes;
