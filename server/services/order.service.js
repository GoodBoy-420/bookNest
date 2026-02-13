import config from "../configs/config.js";
import stripe from "../libs/stripe.js";
import { CartModel } from "../models/cart.model.js";
import { OrderModel } from "../models/order.model.js";

const createCheckoutSession = async (userId, address) => {
  const cart = await CartModel.findOne({ user: userId }).populate("items.book");

  if (!cart || cart.items.length === 0) {
    const err = new Error("Cart is empty");
    err.statusCode = 400;
    throw err;
  }

  // Stripe line items
  const line_items = cart.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.book.title,
      },
      unit_amount: Math.round(item.book.price * 100), // cents
    },
    quantity: item.quantity,
  }));

  // Create Stripe Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${config.cors.origin}/success`,
    cancel_url: `${config.cors.origin}/cart`,
  });

  // Create Order (pending)
  const newOrder = await OrderModel.create({
    user: userId,
    items: cart.items.map((item) => ({
      book: item.book._id,
      quantity: item.quantity,
      price: item.book.price,
    })),
    shippingAddress: address,
    totalAmount: cart.totalPrice,
    paymentMethod: "STRIPE",
    paymentStatus: "pending",
    stripeSessionId: session.id,
  });
  return { url: session.url };
};

const getMyOrders = async (userId) => {
  return await OrderModel.find({ user: userId })
    .populate("items.book")
    .sort({ createdAt: -1 });
};

export { createCheckoutSession, getMyOrders };
