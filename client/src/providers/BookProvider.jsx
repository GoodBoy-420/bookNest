import { useReducer } from "react";
import { BookContext } from "../context";
import { bookReducer, initialState } from "../reducers/BookReducer";

const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
