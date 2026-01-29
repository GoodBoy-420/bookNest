import * as WishListServices from "../services/wishlist.service.js";
import { getAuthUser } from "../utils/getAuthUser.js";

export const toggleWishList = async (req, res) => {
  let user = await getAuthUser(req);
  const userId = user._id ?? user[0]?._id;

  if (!userId) throw new Error("Invalid User");

  const { bookId } = req.params;

  if (!bookId) throw new Error("Book does Not Found.");

  const result = await WishListServices.toggleWishList(userId, bookId);

  res.status(200).send({
    success: true,
    message: result,
  });
};

export const getWishLists = async (req, res) => {
  const user = await getAuthUser(req);

  const userId = user[0]?._id;

  const result = await WishListServices.getWishLists(userId);

  res.status(200).send({
    success: true,
    data: result,
  });
};
