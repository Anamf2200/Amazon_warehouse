import { createSelector } from "@reduxjs/toolkit";
import { getInventoryValue, getLowStockProducts } from "../utils/calculation";

export const selectProducts = (state) => state.products;
export const selectCategories = (state) => state.categories;
export const selectSuppliers = (state) => state.suppliers;
export const selectOrders = (state) => state.orders;
export const selectStockIn = (state) => state.stockIn;
export const selectStockOut = (state) => state.stockOut;
export const selectWastage = (state) => state.wastage;

export const selectProductById = (id) => (state) =>
  state.products.find((product) => product.id === id);

export const selectCategoryById = (id) => (state) =>
  state.categories.find((category) => category.id == id);

export const selectSupplierById = (id) => (state) =>
  state.suppliers.find((supplier) => supplier.id == id);

export const selectOrderById = (id) => (state) =>
  state.orders.find((order) => order.id == id);

export const selectDashboardSummary = createSelector(
  [selectProducts, selectCategories, selectSuppliers, selectOrders, selectWastage],
  (products, categories, suppliers, orders, wastage) => {
    const inventoryValue = getInventoryValue(products);
    const lowStockProducts = getLowStockProducts(products);

    const totalStock = products.reduce((sum, product) => sum + Number(product.quantity), 0);

    const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

    const totalProfit = orders.reduce((sum, order) => sum + Number(order.profit || 0), 0);

    const totalLoss = wastage.reduce((sum, item) => sum + Number(item.loss || 0), 0);

    const pendingOrders = orders.filter((order) => order.status === "Pending").length;

    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalSuppliers: suppliers.length,
      totalOrders: orders.length,
      totalStock,
      revenue,
      totalProfit,
      totalLoss,
      totalWastage: wastage.length,
      pendingOrders,
      inventoryValue,
      lowStockProducts,
    };
  }
);
