import * as BookServices from "../services/book.services.js";
import { getAuthUser } from "../utils/getAuthUser.js";

export const getAllBooks = async (req, res) => {
  const { keyword = "", page = 1, minPrice, maxPrice, categories } = req.query;

  const categoryArray = categories ? categories.split(",") : [];
  const result = await BookServices.getAllBooks(
    keyword,
    page,
    minPrice,
    maxPrice,
    categoryArray,
  );

  res.status(200).send({
    success: true,
    data: result,
  });
};

export const getSingleBook = async (req, res) => {
  let bookId = req.params.bookId;

  if (!bookId) throw new Error("Book not found");

  const result = await BookServices.getSingleBook(bookId);

  res.status(200).send({
    success: true,
    data: result,
  });
};

export const postBook = async (req, res) => {
  const user = await getAuthUser(req);

  if (user[0].role !== "admin") {
    throw new Error("Book posting is not possible with this role");
  }

  let postBook = await BookServices.postBook(user, req);

  if (!postBook) throw new Error("Failed to post book");

  res.status(201).send({
    success: true,
    message: "Book Posted Successfully",
  });
};

export const deleteBook = async (req, res) => {
  const bookId = req.params.bookId;

  if (!bookId) throw new Error("Book not found");

  const deleteBook = await BookServices.deleteBook(bookId);

  if (!deleteBook) throw new Error("Book not found or already deleted");

  res.status(200).send({
    success: true,
    message: "Book Deleted Successfully",
  });
};

export const updateBook = async (req, res) => {
  const user = await getAuthUser(req);

  const bookId = req.params.bookId;

  const updateData = req.body;

  if (!bookId) throw new Error("Book not found");

  const updateBook = await BookServices.updateBook(bookId, updateData, user);

  if (!updateBook)
    throw new Error("Book not found or not authorized to update");

  res.status(200).send({
    success: true,
    message: "Book Updated Successfully",
  });
};
