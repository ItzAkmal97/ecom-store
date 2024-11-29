import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "../features/productsSlice";
import cartReducer from "../features/cartSlice";
import stripeReducer from "../features/stripeSlice";
import loginSignupReducer from "../features/loginSignupSlice";

export const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart: cartReducer,
    stripe: stripeReducer,
    loginSignup: loginSignupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
