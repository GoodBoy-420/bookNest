import { BookModel } from "../models/book.model.js";
import { wishListModel } from "../models/wishList.model.js";

const toggleWishList = async (userId, bookId) => {
  let book = await BookModel.findById(bookId);

  if (!book) {
    const err = new Error("Book Not Found or might be deleted.");
    err.statusCode = 400;
    throw err;
  }

  const existingWish = await wishListModel.findOne({
    userId,
    bookId,
  });

  if (existingWish) {
    await wishListModel.deleteOne(existingWish._id);
    return "book removed from wishLists";
  }
  await wishListModel.create({
    userId,
    bookId,
  });
  return "book added to wishLists";
};

const getWishLists = async (userId) => {
  let JoinWithUserStage = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user_details",
    },
  };

  let JoinWithbookStage = {
    $lookup: {
      from: "books",
      localField: "bookId",
      foreignField: "_id",
      as: "book_details",
    },
  };

  let unwindUserStage = { $unwind: "$user_details" };

  let unwindbookStage = { $unwind: "$book_details" };

  let projectStage = {
    $project: {
      _id: 0,
      "user_details.name": 1,
      "user_details.email": 1,
      "book_details.title": 1,
      "book_details.category": 1,
    },
  };

  const wishList = await wishListModel.aggregate([
    {
      $match: {
        userId,
      },
    },
    JoinWithUserStage,
    unwindUserStage,
    JoinWithbookStage,
    unwindbookStage,
    projectStage,
  ]);

  if (!wishList || wishList.length == 0) {
    const err = new Error("No wishLists found.");
    err.statusCode = 404;
    throw err;
  }

  return wishList;
};

export { getWishLists, toggleWishList };
