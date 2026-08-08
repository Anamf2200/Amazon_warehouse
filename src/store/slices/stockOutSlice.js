import { createSlice } from "@reduxjs/toolkit";
import { getStockOutReport } from "../../services/report";

const initialState = getStockOutReport();

const stockOutSlice = createSlice({
  name: "stockOut",
  initialState,
  reducers: {
    setStockOut: (state, action) => action.payload,
  },
});

export const { setStockOut } = stockOutSlice.actions;
export default stockOutSlice.reducer;
