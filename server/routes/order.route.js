import express from "express";
import * as orderController from "../controllers/order.controller.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router
  .route("/create-checkout-session")
  .post(catchAsync(orderController.createCheckoutSession));
router.route("/get-my-orders").get(catchAsync(orderController.getMyOrders));

export default router;
