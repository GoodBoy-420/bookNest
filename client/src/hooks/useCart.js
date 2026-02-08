import { useContext } from "react";

import { CartContext } from "../context/index.js";

export const useCart = () => {
  return useContext(CartContext);
};
