import { setProducts } from "./slices/productsSlice";
import { setCategories } from "./slices/categoriesSlice";
import { setSuppliers } from "./slices/suppliersSlice";
import { setOrders } from "./slices/ordersSlice";
import { setStockIn } from "./slices/stockInSlice";
import { setStockOut } from "./slices/stockOutSlice";
import { setWastage } from "./slices/wastageSlice";

import {
  getProduct,
  addProduct as addProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/product";

import {
  getCategory,
  addCategory as addCategoryService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService,
} from "../services/category";

import {
  getSupplier,
  addSupplier as addSupplierService,
  updateSupplier as updateSupplierService,
  deleteSupplier as deleteSupplierService,
} from "../services/supplier";

import {
  getOrder,
  addOrder as addOrderService,
  updateOrders as updateOrdersService,
  deleteOrder as deleteOrderService,
} from "../services/order";

import { stockIn as stockInService, stockOut as stockOutService } from "../services/stock";
import { wastage as wastageService } from "../services/wastage";
import { getStockInReport, getStockOutReport, getWestageReport } from "../services/report";



/* ----------------------------- Products ----------------------------- */

export const addProduct = (data) => (dispatch) => {
  addProductService(data); // throws "SKU already exists" / "Barcode already exists"
  dispatch(setProducts(getProduct()));
};

export const updateProduct = (updatedProduct) => (dispatch) => {
  updateProductService(updatedProduct);
  dispatch(setProducts(getProduct()));
};

export const deleteProduct = (id) => (dispatch) => {
  deleteProductService(id);
  dispatch(setProducts(getProduct()));
};

/* ----------------------------- Categories ----------------------------- */

export const addCategory = (data) => (dispatch) => {
  addCategoryService(data);
  dispatch(setCategories(getCategory()));
};

export const updateCategory = (updatedCategory) => (dispatch) => {
  updateCategoryService(updatedCategory);
  dispatch(setCategories(getCategory()));
};

export const deleteCategory = (id) => (dispatch) => {
  deleteCategoryService(id);
  dispatch(setCategories(getCategory()));
};

/* ----------------------------- Suppliers ----------------------------- */

export const addSupplier = (data) => (dispatch) => {
  addSupplierService(data);
  dispatch(setSuppliers(getSupplier()));
};

export const updateSupplier = (updatedSupplier) => (dispatch) => {
  updateSupplierService(updatedSupplier);
  dispatch(setSuppliers(getSupplier()));
};

export const deleteSupplier = (id) => (dispatch) => {
  deleteSupplierService(id);
  dispatch(setSuppliers(getSupplier()));
};

/* ------------------------------- Stock -------------------------------- */

export const stockIn = (productId, quantity) => (dispatch) => {
  stockInService(productId, quantity);
  dispatch(setProducts(getProduct()));
  dispatch(setStockIn(getStockInReport()));
};

export const stockOut = (productId, quantity) => (dispatch) => {
  stockOutService(productId, quantity); // throws "Insufficient Stock"
  dispatch(setProducts(getProduct()));
  dispatch(setStockOut(getStockOutReport()));
};

/* ------------------------------- Orders -------------------------------- */

export const addOrder = (data) => (dispatch) => {
  addOrderService(data); // internally also calls stock.js's stockOut
  dispatch(setProducts(getProduct()));
  dispatch(setStockOut(getStockOutReport()));
  dispatch(setOrders(getOrder()));
};

export const updateOrders = (updatedOrder) => (dispatch) => {
  updateOrdersService(updatedOrder);
  dispatch(setOrders(getOrder()));
};

export const deleteOrder = (id) => (dispatch) => {
  deleteOrderService(id);
  dispatch(setOrders(getOrder()));
};

/* ------------------------------ Wastage --------------------------------- */

export const wastage = (productId, quantity) => (dispatch) => {
  wastageService(productId, quantity); 
  dispatch(setProducts(getProduct()));
  dispatch(setWastage(getWestageReport()));
};
