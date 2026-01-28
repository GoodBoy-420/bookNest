import mongoose from "mongoose";

import { BookModel } from "../models/book.model.js";

const objectId = mongoose.Types.ObjectId;

export const getAllBooks = async (keyword, page = 1) => {
  page = parseInt(page);

  if (isNaN(page) || page < 1) page = 1;

  const limit = 10;

  const skip = (page - 1) * limit;

  let searchRegex = { $regex: keyword, $options: "i" };

  let searchQuery = {
    $match: {
      $or: [{ title: searchRegex }, { description: searchRegex }],
    },
  };

  const total = await BookModel.countDocuments({
    $or: [{ title: searchRegex }, { content: searchRegex }],
  });

  const books = await BookModel.aggregate([
    searchQuery,
    {
      $sort: { createdAt: -1 },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  if (!books || books.length === 0) {
    throw new Error("No books found");
  }

  return {
    total,
    skip,
    limit,
    books,
  };
};

export const getSingleBook = async (bookId) => {
  bookId = new objectId(bookId);

  let data = await BookModel.aggregate([
    {
      $match: { _id: bookId },
    },

    {
      $project: {
        _id: 0,
        stock: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ]);

  if (!data || data.length === 0) {
    throw new Error("book not found");
  }

  return data;
};

export const postBook = async (user, req) => {
  const postData = req.body;

  if (!postData) throw new Error("Don't blank anything");

  const data = await BookModel.create(postData);

  if (data) return 1;
};

export const deleteBook = async (bookId) => {
  bookId = new objectId(bookId);

  let data = await BookModel.findOneAndDelete({
    _id: bookId,
  });

  if (data) return 1;
};

export const updateBook = async (bookId, updateData, user) => {
  bookId = new objectId(bookId);

  let data = await BookModel.findOneAndUpdate(
    { _id: bookId, author: user[0]?._id },
    { $set: updateData },
    { new: true, runValidators: true },
  );

  if (data) return 1;
};
