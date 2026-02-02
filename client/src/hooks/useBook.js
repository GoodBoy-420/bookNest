import { useContext } from "react";
import { BookContext } from "../context/index.js";

export const useBook = () => {
  return useContext(BookContext);
};
