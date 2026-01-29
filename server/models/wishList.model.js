import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
  },
  { timestamps: true, versionkeyK: false },
);

// Create a compound index to ensure a user can only wishlist a book once
dataSchema.index({ userId: 1, bookId: 1 }, { unique: true });

export const wishListModel = mongoose.model("wishlists", dataSchema);
