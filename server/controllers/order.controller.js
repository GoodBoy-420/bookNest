import * as OrderService from "../services/order.service.js";
import { getAuthUser } from "../utils/getAuthUser.js";

const createCheckoutSession = async (req, res) => {
  const user = await getAuthUser(req);
  const userId = user[0]?._id;

  if (!userId) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const address = req.body;

  if (!address) {
    return res.status(400).json({
      success: false,
      message: "address not found",
    });
  }

  const result = await OrderService.createCheckoutSession(userId, address);

  res.status(200).send({
    success: true,
    message: result,
  });
};

const getMyOrders = async (req, res) => {
  const user = await getAuthUser(req);
  const userId = user[0]?._id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const result = await OrderService.getMyOrders(userId);

  res.status(200).send({
    success: true,
    data: result,
  });
};

export { createCheckoutSession, getMyOrders };
