import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./userAuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Be defensive: if AuthContext isn't provided, auth may be undefined
  const auth = useContext(AuthContext) || {};
  const user = auth.user ?? null;

  const [cartItems, setCartItems] = useState([]);
  // loadedKey tracks which localStorage key we've loaded for;
  // we only save to localStorage after loadedKey === currentKey
  const [loadedKey, setLoadedKey] = useState(null);

  const getKey = (u) => (u ? `cart_${u._id}` : "cart_guest");

  // Load cart from localStorage when user changes (or on mount)
  useEffect(() => {
    const key = getKey(user);
    try {
      const stored = localStorage.getItem(key);
      setCartItems(stored ? JSON.parse(stored) : []);
    } catch (err) {
      console.error("Failed parsing cart from localStorage:", err);
      setCartItems([]);
    }
    setLoadedKey(key);
  }, [user]);

  // Save cart to localStorage whenever cartItems change,
  // but only after we've loaded the correct key (avoid accidental overwrite)
  useEffect(() => {
    const key = getKey(user);
    if (loadedKey !== key) return; // wait until we've loaded this key
    try {
      localStorage.setItem(key, JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
  }, [cartItems, user, loadedKey]);

  // Cart operations
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) =>
    setCartItems((prev) => prev.filter((i) => i._id !== itemId));

  const updateQuantity = (itemId, qty) => {
    if (qty <= 0) return removeFromCart(itemId);
    setCartItems((prev) =>
      prev.map((i) => (i._id === itemId ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
