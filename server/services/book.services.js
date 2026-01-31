import mongoose from "mongoose";

import { BookModel } from "../models/book.model.js";

const objectId = mongoose.Types.ObjectId;

export const getAllBooks = async (
  keyword = "",
  page = 1,
  minPrice,
  maxPrice,
  categories = [],
) => {
  page = parseInt(page);

  if (isNaN(page) || page < 1) page = 1;

  const limit = 10;

  const skip = (page - 1) * limit;

  const searchRegex = { $regex: keyword, $options: "i" };

  const matchQuery = {
    $and: [
      {
        $or: [{ title: searchRegex }, { description: searchRegex }],
      },
    ],
  };

  // 💰 Price filter (slider)
  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceFilter = {};
    if (minPrice !== undefined) priceFilter.$gte = Number(minPrice);
    if (maxPrice !== undefined) priceFilter.$lte = Number(maxPrice);

    matchQuery.$and.push({ price: priceFilter });
  }

  // 🏷 Category filter (multiple)
  if (categories.length > 0) {
    matchQuery.$and.push({
      category: { $in: categories },
    });
  }

  const total = await BookModel.countDocuments(matchQuery);

  const books = await BookModel.aggregate([
    { $match: matchQuery },
    { $sort: { createdAt: -1 } }, // stable order
    { $skip: skip },
    { $limit: limit },
  ]);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
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
