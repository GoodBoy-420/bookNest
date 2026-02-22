import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [
      {
        book: {
          type: Schema.Types.ObjectId,
          ref: "books",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        priceAtPurchase: { type: Number, required: true },
        coverImage: String,
      },
    ],

    totalPrice: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CartModel = mongoose.model("carts", dataSchema);
