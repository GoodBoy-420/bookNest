import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [
      {
        book: { type: mongoose.Schema.Types.ObjectId, ref: "books" },
        quantity: Number,
        price: Number,
      },
    ],
    shippingAddress: {
      name: String,
      phone: String,
      addressLine: String,
      city: String,
      postalCode: String,
      country: String,
    },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["COD", "STRIPE"], required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    stripeSessionId: String,
  },
  { timestamps: true, versionkeyK: false },
);

export const OrderModel = mongoose.model("orders", dataSchema);
