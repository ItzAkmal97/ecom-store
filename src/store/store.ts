import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "../features/productsSlice";
import cartReducer from "../features/cartSlice";
import stripeReducer from "../features/stripeSlice";

export const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart: cartReducer,
    stripe: stripeReducer,
 },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
