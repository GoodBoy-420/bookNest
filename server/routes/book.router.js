import express from "express";
import * as BookController from "../controllers/book.controller.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router.route("/get-all").get(catchAsync(BookController.getAllBooks));

router.route("/get/:bookId").get(catchAsync(BookController.getSingleBook));

router.route("/post").post(catchAsync(BookController.postBook));

router.route("/update/:bookId").put(catchAsync(BookController.updateBook));

router.route("/delete/:bookId").delete(catchAsync(BookController.deleteBook));

export default router;
