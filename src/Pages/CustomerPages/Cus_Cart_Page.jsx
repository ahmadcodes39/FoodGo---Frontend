import { Trash2 } from "lucide-react";
import { useCart } from "../../Components/App Global States/CartContext";
import Cus_TopHeader from "../../Components/CustomerComponents/Cus_TopHeader";

const Cus_Cart_Page = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotal } = useCart();

  const deliveryFee = 3.99;
  const subtotal = getTotal();
  const total = subtotal + deliveryFee;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Cus_TopHeader />
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">No items in cart.</p>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    {/* Image + Name */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-orange-600 font-semibold">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                        onClick={() =>
                          updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                        }
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <span className="font-semibold text-gray-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 border-t pt-4 space-y-2 text-right">
                <p>
                  <span className="font-semibold">Subtotal:</span>{" "}
                  <span className="text-gray-700">${subtotal.toFixed(2)}</span>
                </p>
                <p>
                  <span className="font-semibold">Delivery Fee:</span>{" "}
                  <span className="text-gray-700">${deliveryFee.toFixed(2)}</span>
                </p>
                <p className="text-lg font-bold">
                  <span>Total:</span>{" "}
                  <span className="text-black">${total.toFixed(2)}</span>
                </p>
              </div>

              {/* Checkout Button */}
              <button className="w-full mt-6 bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition">
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cus_Cart_Page;
