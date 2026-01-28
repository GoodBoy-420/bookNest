import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },

    otp: {
      type: Number,
      default: 0,
    },
    profile: {
      bio: {
        type: String,
      },
      profilePic: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = mongoose.model("users", dataSchema);
