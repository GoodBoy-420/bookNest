const initialState = {
  books: [],
  loading: false,
  error: null,
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case "data_fetching": {
      return {
        ...state,
        loading: true,
      };
    }
    case "data_fetched": {
      return {
        ...state,
        books: action.data,
        loading: false,
      };
    }
    case "data_fetch_error": {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
};

export { bookReducer, initialState };
