import axios from "axios";
import { useEffect, useReducer } from "react";
import { CartContext } from "../context";
import { useAuth } from "../hooks/useAuth";
import { cartReducer, initialState } from "../reducers/cartReducer";

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { auth } = useAuth();

  /* ----------------------------------
     🟢 Restore guest cart on app load
  ---------------------------------- */
  useEffect(() => {
    if (!auth?.user) {
      const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
      hydrateGuestCart(guestCart);
    }
  }, []);

  /* ----------------------------------
     🔐 Sync guest cart after login
  ---------------------------------- */
  useEffect(() => {
    if (auth?.user) {
      syncGuestCart();
    }
  }, [auth?.user]);

  /* ----------------------------------
     👤 Guest cart hydration
  ---------------------------------- */
  const hydrateGuestCart = (items) => {
    const totalItems = items.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = items.reduce((s, i) => s + i.quantity * i.price, 0);

    dispatch({
      type: "cart_set",
      payload: {
        items,
        totalItems,
        totalPrice,
      },
    });
  };

  /* ----------------------------------
     🔐 Sync guest → DB & fetch cart
  ---------------------------------- */
  const syncGuestCart = async () => {
    try {
      dispatch({ type: "cart_loading" });

      const guestItems = JSON.parse(localStorage.getItem("cart")) || [];

      if (guestItems.length > 0) {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/cart/sync`, {
          items: guestItems.map((i) => ({
            book: i.book,
            quantity: i.quantity,
          })),
        });

        localStorage.removeItem("cart");
      }

      const res = await api.get("/cart");
      dispatch({ type: "cart_set", payload: res.data.data });
    } catch (err) {
      dispatch({
        type: "cart_error",
        error: err.response?.data?.message || "Cart sync failed",
      });
    }
  };

  /* ----------------------------------
     ➕ Add to cart (guest + auth)
  ---------------------------------- */
  const addToCart = async (bookId, price) => {
    // 👤 GUEST USER
    if (!auth?.user) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find((i) => i.book === bookId);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          book: bookId,
          quantity: 1,
          price, // frontend only
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      hydrateGuestCart(cart);
      return;
    }

    // 🔐 AUTH USER
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/cart/add`,
      {
        bookId,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2EzMGIxZjdkYTJiYjk0ZDNiNTAwNiIsImVtYWlsIjoicmlhZGlzbGFtOTExN0BnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzcwNTM4ODI0LCJleHAiOjE3NzA1NDIxMjR9.rNqeO31byUyb5juo7unc6CEE6SX2yyVG-c_6xIqmoV0`,
        },
      },
    );
    console.log(res);

    dispatch({ type: "cart_set", payload: res.data.data });
  };

  /* ----------------------------------
     🔄 Update quantity (cart page)
  ---------------------------------- */
  const updateQuantity = async (bookId, quantity) => {
    if (!auth?.user) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const item = cart.find((i) => i.book === bookId);

      if (item) item.quantity = quantity;

      localStorage.setItem("cart", JSON.stringify(cart));
      hydrateGuestCart(cart);
      return;
    }

    await axios.post(`${import.meta.env.VITE_BASE_URL}/cart/add`, {
      bookId,
      quantity,
    });
    const res = await api.get("/cart");
    dispatch({ type: "cart_set", payload: res.data.data });
  };

  /* ----------------------------------
     🚪 Clear cart on logout
  ---------------------------------- */
  const clearCart = () => {
    dispatch({ type: "cart_clear" });
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
