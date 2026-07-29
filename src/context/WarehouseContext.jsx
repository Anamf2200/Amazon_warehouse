import { createContext } from "react";
import { addProduct,getProduct,updateProduct,deleteProduct,getProductById } from "../services/product";
import { addOrder,getOrder,updateOrders,deleteOrder,getOrderById } from "../services/order";
import { getCategory,addCategory,updateCategory,deleteCategory,getCategoryById } from "../services/category";
import { getSupplier,addSupplier,updateSupplier,deleteSupplier,getSupplierBYId } from "../services/supplier";
import { getOrdersReport,getCategoryReport,getProductReport,getStockInReport,getStockOutReport,getSupplierReport,getWestageReport,getDashboardSummary } from "../services/report";
import { wastage } from "../services/wastage";
import { stockIn,stockOut } from "../services/stock";

export const WarehouseContext=createContext()

export const WarehouseProvider = ({ children }) => {
    const value={
        //Products
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,

        //Category
        getCategory,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,


        //order
        getOrder,
        addOrder,
        updateOrders,
        getOrderById,
        deleteOrder,

        // Supplier
        getSupplier,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        getSupplierBYId,


        // Stock
        stockIn,
        stockOut,

        //Reports
        getStockInReport,
        getStockOutReport,
        getSupplierReport,
        getCategoryReport,
        getProductReport,
        getWestageReport,
        getDashboardSummary,
        getOrdersReport,

        //Wastage
        wastage


    }

    return (
        <WarehouseContext.Provider value={value}>
            {children}
        </WarehouseContext.Provider>
    );
};