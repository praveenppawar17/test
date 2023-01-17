import Category from "../model/category.js";
import Product from "../model/product.js";

export const addProductsFromFakeStoreDao = async (productsData) => {
    try{
        const productsResponse = await Product.insertMany(productsData);
        return productsResponse
    }catch(error){
        return error
    }
}

export const updateProductDao = async (updateDetails) => {
    try {
        console.log("hows the details... ", updateDetails.details.productDetails)
        const productResponse = await Product.updateOne(
            {"_id":updateDetails.id},
            {$set:updateDetails.details.productDetails}
            )
        console.log("update res... ", productResponse)
        return productResponse
    } catch (error) {
        return error
    }
}

export const deleteProductByIdDao = async (id) => {
    try {
        const productResponse = await Product.deleteOne({"_id": id})
        return productResponse
    } catch (error) {
        return error
    }
}

export const searchProductDao = async (search) => {
    try {
        console.log("search....... ", search)
        const productResponse = await Product.find(
            { $text: { $search:search } }
            )
        if(!productResponse) {
            return false
        }
        console.log("prec..... ", productResponse)
        return productResponse
    } catch (error) {
        return error
    }
}

export const getProductByIdDao = async (id) => {
    try {
        const productResponse = await Product.findOne({ "_id": id})
        if(!productResponse){
            return false
        }
        return productResponse
    } catch (error) {
        return error
    }
}

export const addProductDao = async (productDetails) => {
    try {
        console.log("what am i geting here... ", productDetails)
        const product = new Product(productDetails)
        const productResponse = product.save()
        return productResponse
    } catch (error) {
        return error
    }
}

export const getCategoryDao = async () => {
    try {
        const categoryResponse = await Category.find()
        return categoryResponse
    } catch (error) {
        return error
    }
}

export const getProductsbyCategoryDao = async (category) => {
    try {
    const productResponse = await Product.aggregate([{$match:{category: category}}])
        return productResponse
    } catch (error) {
        return error
    }
}

export const getAllProductsDao = async () => {
    try {
        const productResponse = await Product.find()
        return productResponse
    } catch (error) {
        return error
    }
}