import { Trash2 } from "lucide-react";
import { useCart } from "../../Components/App Global States/CartContext";
import Cus_TopHeader from "../../Components/CustomerComponents/Cus_TopHeader";
import Header from "../../Components/Landing Page Components/Header";

const Cus_Cart_Page = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotal } = useCart();
  const total = getTotal();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-[90px]">
      <Header />

      <div className="flex justify-center px-4 sm:px-6 md:px-10 py-6">
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
            Your Cart
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">No items in cart.</p>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 gap-3 sm:gap-0"
                  >
                    {/* Item Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-sm sm:text-base text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-orange-600 font-semibold text-sm sm:text-base">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity + Actions */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <button
                          className="px-2 py-1 sm:px-3 border-r hover:bg-gray-100"
                          onClick={() =>
                            updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                          }
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-medium text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          className="px-2 py-1 sm:px-3 border-l hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <span className="font-semibold text-gray-700 text-sm sm:text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Section */}
              <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row sm:justify-between items-center">
                <p className="text-lg sm:text-xl font-bold mb-3 sm:mb-0">
                  Total: <span className="text-orange-600">${total.toFixed(2)}</span>
                </p>
                <button className="w-full sm:w-auto bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition text-sm sm:text-base">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cus_Cart_Page;
