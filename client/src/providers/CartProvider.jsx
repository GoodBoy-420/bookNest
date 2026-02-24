import { useEffect, useReducer } from "react";

import { CartContext } from "../context";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { cartReducer, initialState } from "../reducers/cartReducer";
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { auth } = useAuth();
  const { api } = useAxios();

  // Restore guest cart on app load

  useEffect(() => {
    if (!auth?.user) {
      const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
      hydrateGuestCart(guestCart);
    }
  }, []);

  // Sync guest cart after login

  useEffect(() => {
    if (auth?.user) {
      syncGuestCart();
    }
  }, [auth?.user]);

  // Guest cart hydration

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

  // Sync guest → DB & fetch cart

  const syncGuestCart = async () => {
    try {
      dispatch({ type: "cart_loading" });

      const guestItems = JSON.parse(localStorage.getItem("cart")) || [];

      if (guestItems.length > 0) {
        await api.post(`${import.meta.env.VITE_BASE_URL}/cart/sync`, {
          items: guestItems.map((i) => ({
            book: i.book,
            quantity: i.quantity,
            coverImage: i.image,
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

  // Add to cart (guest + auth)

  const addToCart = async (bookId, price, title, image) => {
    //  GUEST USER
    if (!auth?.user) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find((i) => i.book === bookId);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          book: bookId,
          quantity: 1,
          price,
          title,
          image,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      hydrateGuestCart(cart);
      return;
    }

    //  AUTH USER
    await api.post("/cart/add", {
      bookId,
      quantity: 1,
      image,
    });
    const res = await api.get("/cart");
    dispatch({ type: "cart_set", payload: res.data.data });
  };

  const updateQuantity = async (id, action) => {
    //  Guest
    if (!auth?.user) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      cart = cart.map((item) => {
        if (item.book === id) {
          if (action === "inc") item.quantity += 1;
          if (action === "dec" && item.quantity > 1) item.quantity -= 1;
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      hydrateGuestCart(cart);
      return;
    }
    let bookId = id._id;

    //  Logged user
    await api.put("/cart/update", { bookId, action });
    const res = await api.get("/cart");
    dispatch({ type: "cart_set", payload: res.data.data });
  };

  const removeItem = async (id) => {
    //  Guest
    if (!auth?.user) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter((item) => item.book !== id);

      localStorage.setItem("cart", JSON.stringify(cart));
      hydrateGuestCart(cart);
      return;
    }
    let bookId = id._id;
    //  Logged user
    await api.delete(`/cart/remove/${bookId}`);
    const res = await api.get("/cart");
    dispatch({ type: "cart_set", payload: res.data.data });
  };

  //  🚪 Clear cart on logout
  const clearCart = () => {
    dispatch({ type: "cart_clear" });
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        updateQuantity,
        clearCart,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
