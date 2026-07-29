
import { getItem,saveData } from "../utils/storage";
import { STORAGE_KEY } from "../utils/constant";

export const getProduct=()=>{
    return getItem(STORAGE_KEY.PRODUCTS)
}

export const addProduct=(data)=>{
    const products= getProduct()
     const skuExists = products.some(
        (product) => product.sku === data.sku
    );

    if (skuExists) {
        throw new Error("SKU already exists");
    }

    const barcodeExists = products.some(
        (product) => product.barcode === data.barcode
    );

    if (barcodeExists) {
        throw new Error("Barcode already exists");
    }
     products.push({
        id:Date.now(),
        ...data
    })
     saveData(STORAGE_KEY.PRODUCTS,products)
}

export const updateProduct=(updatedProducts)=>{
    const products= getProduct()
    const skuExists = products.some(
    (product) =>
        product.sku === updatedProducts.sku &&
        product.id !== updatedProducts.id
);

if (skuExists) {
    throw new Error("SKU already exists");
}

const barcodeExists = products.some(
    (product) =>
        product.barcode === updatedProducts.barcode &&
        product.id !== updatedProducts.id
);

if (barcodeExists) {
    throw new Error("Barcode already exists");
}
    const updatedProduct= products.map((product)=>{
        return product.id===updatedProducts.id?
        updatedProducts:product
    })
    saveData(STORAGE_KEY.PRODUCTS,updatedProduct)
}

export const deleteProduct=(id)=>{
    const products=getProduct()
    const deletedProduct= products.filter((product)=>{
        return product.id!==id
    })

    saveData(STORAGE_KEY.PRODUCTS,deletedProduct)
}

export const getProductById=(id)=>{
    const products= getProduct()
    return products.find((product)=>
         product.id === id
    )
}