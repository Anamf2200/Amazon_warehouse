import { createSlice } from "@reduxjs/toolkit";
import { getOrder } from "../../services/order";

const initialState = getOrder();

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => action.payload,
  },
});

export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
