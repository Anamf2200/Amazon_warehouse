import { getItem,saveData } from "../utils/storage";
import { STORAGE_KEY } from "../utils/constant";
import { calculateLoss } from "../utils/calculation";

export const wastage=(productId,quantity)=>{
    const products= getItem(STORAGE_KEY.PRODUCTS)

    const wastageRecord= getItem(STORAGE_KEY.WASTAGE)

    const selectedProduct = products.find(
    (product) => product.id === productId
);

if (!selectedProduct) {
    throw new Error("Product not found");
}

if (selectedProduct.quantity < quantity) {
    throw new Error("Insufficient stock");
}

    const updatedQuantity= products.map((product)=>{
        if(product.id==productId){
            return{
                ...product,
                quantity:Number(product.quantity)-Number(quantity)
            }
        }
        return product

    })

    saveData(STORAGE_KEY.PRODUCTS,updatedQuantity)
    const loss = calculateLoss(selectedProduct.costPrice, quantity);

wastageRecord.push({
    id:Date.now(),
    productId,
    quantity,
    loss,
    date:new Date().toISOString()
})
saveData(STORAGE_KEY.WASTAGE,wastageRecord)
}