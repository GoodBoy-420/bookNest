import * as CartServices from "../services/cart.service.js";
import { getAuthUser } from "../utils/getAuthUser.js";

const syncCart = async (req, res) => {
  const user = await getAuthUser(req);
  const userId = user[0]?._id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const { items } = req.body;
  if (!items || items.length === 0) {
    return res.status(200).send({
      success: true,
      data: [],
    });
  }

  const cart = await CartServices.syncCart(userId, items);

  res.status(200).send({
    success: true,
    data: cart,
  });
};

// For logged-in user
const addToCart = async (req, res) => {
  let user = await getAuthUser(req);
  const userId = user[0]?._id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const { bookId, quantity, image } = req.body;

  if (!bookId) {
    return res.status(400).json({
      success: false,
      message: "Book not found",
    });
  }

  const cart = await CartServices.addToCart(
    userId,
    bookId,
    quantity || 1,
    image,
  );

  res.status(200).send({
    success: true,
    data: cart,
  });
};

const updateCartItem = async (req, res) => {
  const user = await getAuthUser(req);
  const userId = user[0]?._id;

  const { bookId, action } = req.body;

  const cart = await CartServices.updateQuantity(userId, bookId, action);

  res.status(200).send({
    success: true,
    data: cart,
  });
};

const removeCartItem = async (req, res) => {
  const user = await getAuthUser(req);
  const userId = user[0]?._id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const { bookId } = req.params;

  if (!bookId) {
    return res.status(400).json({
      success: false,
      message: "Book not found",
    });
  }

  const cart = await CartServices.removeItem(userId, bookId);

  res.status(200).send({
    success: true,
    data: cart,
  });
};

const getCart = async (req, res) => {
  const user = await getAuthUser(req);
  const userId = user[0]?._id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const result = await CartServices.getCart(userId);

  res.status(200).send({
    success: true,
    data: result,
  });
};

export { addToCart, getCart, removeCartItem, syncCart, updateCartItem };
