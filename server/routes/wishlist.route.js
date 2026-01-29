import express from "express";
import * as WishController from "../controllers/wishlist.controller.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router.route("/:bookId").post(catchAsync(WishController.toggleWishList));
router.route("/get-wishlist").get(catchAsync(WishController.getWishLists));

export default router;
