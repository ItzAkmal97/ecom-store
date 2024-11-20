import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product  {
 id: number;
 title: string;
 price: number;
 description: string;
 thumbnail: string;
};


interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart: (state) => {
            state.loading = true;
        },
        fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.error = null;
            state.products = action.payload

        },

        fetchProductsFailure: (state, action: PayloadAction<string | null>) =>{
            state.loading = false;
            state.error = action.payload
        }
    }

})

export const {fetchProductsStart, fetchProductsSuccess, fetchProductsFailure} = ProductSlice.actions;
export default ProductSlice.reducer;








