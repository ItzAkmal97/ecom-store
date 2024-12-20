import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

 const CartIcon = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  
  return (
    <div className="relative">
      <ShoppingCart className="h-6 w-6" />
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {items.length}
        </span>
      )}
    </div>
  );
};

export default CartIcon;