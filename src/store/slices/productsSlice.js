import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../../services/product";

const initialState = getProduct();

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Products are always written to localStorage by services/product.js first;
    // this reducer just syncs the Redux store with what's already persisted.
    setProducts: (state, action) => action.payload,
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
