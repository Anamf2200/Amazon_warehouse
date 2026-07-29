export const calculateProfit = (costPrice, sellingPrice, quantity) => {
    return (sellingPrice - costPrice) * quantity;
};

export const calculateLoss = (costPrice, quantity) => {
    return costPrice * quantity;
};

export const getInventoryValue = (products) => {
    return products.reduce(
        (total, product) => total + (product.costPrice * product.quantity),
        0
    );
};

export const getLowStockProducts = (products, threshold = 5) => {
    return products.filter(
        (product) => product.quantity <= threshold
    );
};