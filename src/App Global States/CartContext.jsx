// CartContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { AuthContext } from "./userAuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Auth context (safe fallback)
  const auth = useContext(AuthContext) || {};
  const user = auth.user ?? null;

  const [cartItems, setCartItems] = useState([]);
  const [loadedKey, setLoadedKey] = useState(null);

  // stable primitive key based on user._id
  const cartKey = useMemo(() => {
    return user?._id ? `cart_${user._id}` : "cart_guest";
  }, [user?._id]);

  // Helper to shallow-compare arrays of items by JSON (cheap and fine for small carts)
  const isSameArray = (a, b) => {
    try {
      return JSON.stringify(a || []) === JSON.stringify(b || []);
    } catch {
      return false;
    }
  };

  // Load cart from localStorage when cartKey changes (login/logout/mount)
  useEffect(() => {
    try {
      const storedRaw = localStorage.getItem(cartKey);
      const parsed = storedRaw ? JSON.parse(storedRaw) : [];

      // Avoid setting state if it's identical (prevents extra renders)
      setCartItems((prev) => {
        if (isSameArray(prev, parsed)) return prev;
        return Array.isArray(parsed) ? parsed : [];
      });
    } catch (err) {
      console.error("Failed parsing cart from localStorage:", err);
      setCartItems((prev) => (isSameArray(prev, []) ? prev : []));
    }

    setLoadedKey(cartKey);
  }, [cartKey]);

  // Save cart to localStorage whenever cartItems change,
  // but only after we've loaded the correct key (avoid accidental overwrite)
  useEffect(() => {
    if (loadedKey !== cartKey) return; // wait until we've loaded this key
    try {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
  }, [cartItems, cartKey, loadedKey]);

  // Cart operations
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: (i.quantity || 0) + 1 } : i
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
    cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

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
