import { UserModel } from "../models/user.model.js";

// Only If need more information than stored in token then use this function.

export const getAuthUser = async (req) => {
  const data = await UserModel.aggregate([
    {
      $match: { email: req?.claims?.email },
    },
    {
      $project: { _id: 1, name: 1, email: 1 },
    },
  ]);

  if (!data || data.length == 0) throw new Error("User not exsts");

  return data;
};
