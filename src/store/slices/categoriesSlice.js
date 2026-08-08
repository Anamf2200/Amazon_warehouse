import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from "../../services/category";

const initialState = getCategory();

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => action.payload,
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
