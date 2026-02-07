import express from "express";
import * as CartController from "../controllers/cart.controller.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router.post("/sync", catchAsync(CartController.syncCart));
router.post("/add", catchAsync(CartController.addToCart));
router.get("/", catchAsync(CartController.getCart));

export default router;
