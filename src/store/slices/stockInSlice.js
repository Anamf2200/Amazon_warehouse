import { createSlice } from "@reduxjs/toolkit";
import { getStockInReport } from "../../services/report";

const initialState = getStockInReport();

const stockInSlice = createSlice({
  name: "stockIn",
  initialState,
  reducers: {
    setStockIn: (state, action) => action.payload,
  },
});

export const { setStockIn } = stockInSlice.actions;
export default stockInSlice.reducer;
