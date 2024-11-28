import { Plus, Minus, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
} from "../features/cartSlice";
import { NavLink } from "react-router-dom";

export const CartPanel = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4 pr-2">
            {items.map((item) => (
              <div key={item.id} className="flex p-4 border-b">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item))}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="border-t p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total</span>
            <span className="font-medium">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <NavLink to={"/checkout"}>
              <button className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors duration-200">
                Checkout
              </button>
            </NavLink>
            <button onClick={() => dispatch(clearCart())}>
              <Trash2 size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
