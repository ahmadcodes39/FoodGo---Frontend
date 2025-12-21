import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./App Global States/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./App Global States/userAuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <>
    <Toaster position="top-right" reverseOrder={false} />
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          <div data-theme="light">
            <App />
          </div>
        </CartProvider>
      </AuthProvider>
    </StrictMode>
  </>
);
