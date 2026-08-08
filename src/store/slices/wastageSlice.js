import { createSlice } from "@reduxjs/toolkit";
import { getWestageReport } from "../../services/report";

const initialState = getWestageReport();

const wastageSlice = createSlice({
  name: "wastage",
  initialState,
  reducers: {
    setWastage: (state, action) => action.payload,
  },
});

export const { setWastage } = wastageSlice.actions;
export default wastageSlice.reducer;
