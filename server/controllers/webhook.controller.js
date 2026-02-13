import config from "../configs/config.js";
import stripe from "../libs/stripe.js";
import { BookModel } from "../models/book.model.js";
import { CartModel } from "../models/cart.model.js";
import { OrderModel } from "../models/order.model.js";

export const stripeWebhookController = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.stripe.webhookSecret,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const order = await OrderModel.findOne({
      stripeSessionId: session.id,
    });

    if (order && order.paymentStatus !== "paid") {
      order.paymentStatus = "paid";
      await order.save();

      // Reduce stock
      for (const item of order.items) {
        await BookModel.findByIdAndUpdate(item.book, {
          $inc: { stock: -item.quantity },
        });
      }

      // Clear cart
      await CartModel.findOneAndDelete({ user: order.user });
    }
  }

  res.json({ received: true });
};
