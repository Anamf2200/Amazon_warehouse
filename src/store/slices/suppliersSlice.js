import { createSlice } from "@reduxjs/toolkit";
import { getSupplier } from "../../services/supplier";

const initialState = getSupplier();

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    setSuppliers: (state, action) => action.payload,
  },
});

export const { setSuppliers } = suppliersSlice.actions;
export default suppliersSlice.reducer;
