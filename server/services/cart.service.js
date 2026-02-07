import { BookModel } from "../models/book.model.js";
import { CartModel } from "../models/cart.model.js";

const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + item.quantity * item.priceAtPurchase, 0);

const syncCart = async (userId, guestItems) => {
  let cart = await CartModel.findOne({ user: userId });

  if (!cart) {
    cart = new CartModel({ user: userId, items: [] });
  }

  for (const item of guestItems) {
    const book = await BookModel.findById(item.book);

    if (!book) continue;

    if (book.stock < item.quantity) {
      const err = new Error(`Only ${book.stock} items available`);
      err.statusCode = 400;
      throw err;
    }

    const existingItem = cart.items.find(
      (i) => i.book.toString() === item.book,
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.priceAtPurchase = book.price;
    } else {
      cart.items.push({
        book: item.book,
        quantity: item.quantity,
        priceAtPurchase: book.price,
      });
    }
  }

  cart.totalPrice = calculateTotal(cart.items);
  await cart.save();

  return cart;
};

const addToCart = async (userId, bookId, quantity) => {
  const book = await BookModel.findById(bookId);
  if (!book) {
    const err = new Error("Book Not Found or might be deleted.");
    err.statusCode = 400;
    throw err;
  }

  if (book.stock < quantity) {
    const err = new Error(`Only ${book.stock} items available`);
    err.statusCode = 400;
    throw err;
  }

  let cart = await CartModel.findOne({ user: userId });

  if (!cart) {
    cart = new CartModel({ user: userId, items: [] });
  }

  const existingItem = cart.items.find((i) => i.book.toString() === bookId);

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.priceAtPurchase = book.price;
  } else {
    cart.items.push({
      book: bookId,
      quantity,
      priceAtPurchase: book.price,
    });
  }

  cart.totalPrice = calculateTotal(cart.items);
  await cart.save();

  return cart;
};

const getCart = async (userId) => {
  const cart = await CartModel.findOne({ user: userId }).populate(
    "items.book",
    "title price category stock",
  );

  if (!cart || cart.items.length === 0) {
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  // update price with latest book price
  cart.items.forEach((item) => {
    item.priceAtPurchase = item.book.price;
  });

  cart.totalPrice = calculateTotal(cart.items);
  await cart.save();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items: cart.items,
    totalItems,
    totalPrice: cart.totalPrice,
  };
};

export { addToCart, getCart, syncCart };
