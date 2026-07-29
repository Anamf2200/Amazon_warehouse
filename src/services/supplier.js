
import { getItem,saveData } from "../utils/storage";
import { STORAGE_KEY } from "../utils/constant";


export const getSupplier=()=>{
    return getItem(STORAGE_KEY.SUPPLIERS)
}

export const addSupplier=(data)=>{
    const suppliers= getSupplier()
    suppliers.push({
        id:Date.now(),
        ...data
    })

  return  saveData(STORAGE_KEY.SUPPLIERS,suppliers)
}

export const updateSupplier=(updatedSupplier)=>{
    const suppliers= getSupplier()
    const updateSupplier=suppliers.map((supplier)=>{
       return supplier.id===updatedSupplier.id?
        updatedSupplier:
        supplier
    })

    saveData(STORAGE_KEY.SUPPLIERS,updateSupplier)
}

export const deleteSupplier=(id)=>{
    const suppliers=getSupplier()
    const deleteSupplier= suppliers.filter((supplier)=>
        supplier.id!==id
    )
    saveData(STORAGE_KEY.SUPPLIERS,deleteSupplier)
}

export const getSupplierBYId=(id)=>{
    const suppliers= getSupplier()
  return   suppliers.find((supplier)=>
        supplier.id==id
    )
}
