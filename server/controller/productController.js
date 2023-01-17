import { addProductService, addProductsFromFakeStoreService, deleteProductByIdService, getAllProductsService, getCategoryService, getProductByIdService, getProductsbyCategoryService, searchProductService, updateProductService } from "../service/productService.js"

export const addProductsFromFakeStoreController = async (request, response) => {
    try{
        const productResponse = await addProductsFromFakeStoreService()
        return response.status(200).json({ statusCode: 200,msg: 'Prducts added successfully', productResponse})
    }catch(error){
        return response.status(500).json({ msg: error})
    }
}

export const updateProductController = async (request, response) => {
    try {
        const updateDetails = {
            id: request.params.id,
            details: request.body
        }
        console.log("in ctrl.... ", updateDetails)
        let productResponse = await updateProductService(updateDetails)
        return response.status(200).json({ statusCode: 200,msg: 'Prducts updated successfully', productResponse})
    } catch (error) {
        return response.status(500).json({ msg: error})
    }
}

export const deleteProductByIdController = async (request,response) => {
    try {
        const productResponse = await deleteProductByIdService(request.params.id)
        return response.status(200).json({ statusCode: 200,msg: 'Prducts deleted successfully', productResponse})
    } catch (error) {
        return response.status(500).json({ msg: error})
    }
}

export const searchProductsController = async (request, response) => {
    try {
        // console.log("in controler.... ", reques)
        const productResponse = await searchProductService(request.body.search)
        if(!productResponse){
            return response.status(200).json({ statusCode: 200,msg: 'No prducts found'}) 
        }
        return response.status(200).json({ statusCode: 200, productResponse})
    } catch (error) {
        return response.status(500).json({ msg: error})
    }
}

export const getProductByIdController = async (request, response) => {
    try {
        const productResponse = await getProductByIdService(request.params.id)
        if(!productResponse){
            return response.status(200).json({ statusCode: 200,msg: 'No prducts found'}) 
        }
        return response.status(200).json({ statusCode: 200, productResponse})
    } catch (error) {
        return response.status(500).json({ msg: error})
    }
}

export const addProductController = async (request, response) => {
    try {
        console.log("product details... ", request.body)
        const productResponse = await addProductService(request.body.productDetails)
        console.log('res.... ', productResponse)
        return response.status(200).json({ statusCode: 200, productResponse})
    } catch (error) {
        console.log("er.... ", error)
        return response.status(500).json({ msg: error})
    }
}

export const getCategoryController = async(request, response) => {
    try {
        console.log("header... ", request.body)
        const categoryResponse = await getCategoryService()
        return response.status(200).json({ statusCode: 200, isSuccess: true, categoryResponse})
    } catch (error) {
        return response.status(500).json({ msg: error})
    }
}

export const getProductsbyCategoryController = async (request, response) => {
    try {
        const productResponse = await getProductsbyCategoryService(request.params.category)
        return response.status(200).json({ statusCode: 200, productResponse})
    } catch (error) {
        return response.status(500).json({ msg: error})
    }
}

export const getAllProductsController = async (request, response) => {
    try {
        const productResponse = await getAllProductsService()
        return response.status(200).json({ statusCode: 200, productResponse})
    } catch (error) {
        return response.status(500).json({ msg: error})
    }
}