import { saveData,getItem } from "../utils/storage"
import { STORAGE_KEY } from "../utils/constant"

export const getCategory=()=>{
    return getItem(STORAGE_KEY.CATEGORIES)
}

export const addCategory=(data)=>{
    const categories=getCategory()
    categories.push({
        id:Date.now(),
        ...data
    });
    return saveData(STORAGE_KEY.CATEGORIES,categories)
}

export const updateCategory=(updatedCategory)=>{
    const categories=getCategory()
    const updateCategories= categories.map((category)=>
    category.id===updatedCategory.id
    ? updatedCategory:
    category
    )

    saveData(STORAGE_KEY.CATEGORIES,updateCategories)
}

export const deleteCategory=(id)=>{
    const categories=getCategory()
    const deletedCategory= categories.filter((category)=>
        category.id!==id
    )
    saveData(STORAGE_KEY.CATEGORIES,deletedCategory)
}


export const getCategoryById=(id)=>{
    const categories= getCategory()
   return  categories.find((category)=>
    category.id==id
    )
}