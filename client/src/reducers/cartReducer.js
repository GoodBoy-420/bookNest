const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "cart_loading":
      return { ...state, loading: true };

    case "cart_set":
      return {
        ...state,
        items: action.payload.items,
        totalItems: action.payload.totalItems,
        totalPrice: action.payload.totalPrice,
        loading: false,
      };

    case "cart_error":
      return { ...state, loading: false, error: action.error };

    case "cart_clear":
      return initialState;

    default:
      return state;
  }
};

export { cartReducer, initialState };
