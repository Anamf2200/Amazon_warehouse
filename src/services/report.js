import { getCategory } from "./category"
import { getOrder } from "./order"
import { getProduct } from "./product"
import { getSupplier } from "./supplier"
import { STORAGE_KEY } from "../utils/constant"
import { getItem } from "../utils/storage"
import { getInventoryValue, getLowStockProducts } from "../utils/calculation"


export const getOrdersReport = () => {
    return getOrder()
}
export const getProductReport = () => {
    return getProduct()
}

export const getCategoryReport = () => {
    return getCategory()
}

export const getSupplierReport = () => {
    return getSupplier()
}

export const getStockInReport = () => {
    return getItem(STORAGE_KEY.STOCK_IN)
}

export const getStockOutReport = () => {
    return getItem(STORAGE_KEY.STOCK_OUT)
}
export const getWestageReport = () => {
    return getItem(STORAGE_KEY.WASTAGE)
}

export const getDashboardSummary = () => {
    const products = getProduct();
    const inventoryValue = getInventoryValue(products);
    const lowStockProducts = getLowStockProducts(products);
    const categories = getCategory();
    const suppliers = getSupplier();
    const orders = getOrder();
    const wastage = getItem(STORAGE_KEY.WASTAGE);

    const totalStock = products.reduce(
        (sum, product) => sum + Number(product.quantity),
        0
    );

    const revenue = orders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
    );

    const totalProfit = orders.reduce(
        (sum, order) => sum + Number(order.profit || 0),
        0
    );

    const totalLoss = wastage.reduce(
        (sum, item) => sum + Number(item.loss || 0),
        0
    );

    const pendingOrders = orders.filter(
        (order) => order.status === "Pending"
    ).length;

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
        lowStockProducts
    };
};