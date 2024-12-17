import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getUserOrders = createAsyncThunk('orders/ofUser', getOrdersApi);

const initialState = {
  orders: [] as Array<TOrder>,
  isLoading: true as boolean
};

export const userOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    listOfOrders: (state) => state.orders
  }
});

export const { listOfOrders } = userOrdersSlice.selectors;
