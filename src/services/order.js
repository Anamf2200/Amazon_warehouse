import { getItem,saveData } from "../utils/storage";
import { STORAGE_KEY } from "../utils/constant";
import { stockOut } from "./stock";
import { calculateProfit } from "../utils/calculation";

export const getOrder=()=>{
    return getItem(STORAGE_KEY.ORDERS)
}

export const addOrder = (data) => {
    const orders = getItem(STORAGE_KEY.ORDERS);
    const products = getItem(STORAGE_KEY.PRODUCTS);

    const product = products.find(
        (product) => product.id === data.productId
    );

    if (!product) {
        throw new Error("Product not found");
    }

    stockOut(data.productId, data.quantity);

    const total = product.sellingPrice * data.quantity;

    const profit = calculateProfit(product.costPrice,product.sellingPrice,data.quantity)
    orders.push({
        id: Date.now(),
        ...data,
        total,
        profit,
        date: new Date().toISOString(),
    });

    saveData(STORAGE_KEY.ORDERS, orders);
};

export const updateOrders=(updatedOrder)=>{
    const orders= getOrder()
    const updatedorder=orders.map((order)=>{
        return order.id===updatedOrder.id?
        updatedOrder:order
    })
    saveData(STORAGE_KEY.ORDERS,updatedorder)
}

export const deleteOrder=(id)=>{
    const order= getOrder()
    const deletedOrders= order.filter((order)=>{
        return order.id!==id
    })
    saveData(STORAGE_KEY.ORDERS,deletedOrders)
}

export const getOrderById=(id)=>{
    const orders= getOrder()
    return orders.find((order)=>order.id==id)
}
