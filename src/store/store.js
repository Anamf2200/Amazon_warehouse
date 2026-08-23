import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import suppliersReducer from "./slices/suppliersSlice";
import ordersReducer from "./slices/ordersSlice";
import stockInReducer from "./slices/stockInSlice";
import stockOutReducer from "./slices/stockOutSlice";
import wastageReducer from "./slices/wastageSlice";
import {userReducer} from '../reducers/userReducers'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    suppliers: suppliersReducer,
    orders: ordersReducer,
    stockIn: stockInReducer,
    stockOut: stockOutReducer,
    wastage: wastageReducer,
    user:userReducer
  },
});

export default store;
