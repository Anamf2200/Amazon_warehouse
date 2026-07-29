import { getItem,saveData } from "../utils/storage";
import { STORAGE_KEY } from "../utils/constant";

export const stockIn=(productId,quantity)=>{
const products= getItem(STORAGE_KEY.PRODUCTS)

const stockInHistory=getItem(STORAGE_KEY.STOCK_IN)

const updatedProducts= products.map((product)=>{
    if(product.id === productId){
        return{
...product,
quantity:Number(product.quantity)+Number(quantity)
    }
}
return product
})
saveData(STORAGE_KEY.PRODUCTS,updatedProducts)

stockInHistory.push({
    id:Date.now(),
    productId,
    quantity,
    date:new Date().toString()
})

saveData(STORAGE_KEY.STOCK_IN,stockInHistory)

}


export const stockOut = (productId, quantity) => {

    const products = getItem(STORAGE_KEY.PRODUCTS);

    const stockOutHistory = getItem(STORAGE_KEY.STOCK_OUT);

    const selectedProduct = products.find(
        (product) => product.id === productId
    );

    if (!selectedProduct) {
        throw new Error("Product not found");
    }

    if (selectedProduct.quantity < quantity) {
        throw new Error("Insufficient Stock");
    }

    const updatedProducts = products.map((product) => {
        if (product.id === productId) {
            return {
                ...product,
                quantity: Number(product.quantity) - Number(quantity)
            };
        }

        return product;
    });

    saveData(STORAGE_KEY.PRODUCTS, updatedProducts);

    stockOutHistory.push({
        id: Date.now(),
        productId,
        quantity,
        date: new Date().toISOString()
    });

    saveData(STORAGE_KEY.STOCK_OUT, stockOutHistory);
};