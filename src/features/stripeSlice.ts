import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StripeState {
  name: string;
  email: string;
  processing: boolean;
  error: string | null;
  success: boolean;
}

const initialState: StripeState = {
  name: '',
  email: '',
  processing: false,
  error: null,
  success: false,
};

const stripeSlice = createSlice({
  name: 'stripe',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.processing = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
  },
});

export const { setName, setEmail, setProcessing, setError, setSuccess } =
  stripeSlice.actions;
export default stripeSlice.reducer;