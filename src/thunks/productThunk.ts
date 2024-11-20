import { AppDispatch } from "../store/store";
import {
  fetchProductsStart,
  fetchProductsFailure,
  fetchProductsSuccess,
} from "../features/productsSlice";

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchProductsStart());

    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

    const resData = await response.json();

    dispatch(fetchProductsSuccess(resData.products));
  } catch (error) {
    dispatch(fetchProductsFailure((error as Error).message));
  }
};


