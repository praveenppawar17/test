import { request } from "express"
import { addProductToCartService, getCartService } from "../service/cartService.js"

export const addProductToCartController = async (request, response) => {
    try {
        console.log("in ctrl... ", request.body)
        const cartResponse = await addProductToCartService(request.body.productDetails)
        return response.status(200).json({ statusCode: 200,msg: 'Product added to cart successfull', cartResponse})

    } catch (error) {
               return response.status(500).json({ msg: 'Error while adding product to cart'}) 
    }
}

export const getCartController = async (request, response) => {
    try {
        const cartResponse = await getCartService(request.params.userId)
        return response.status(200).json({ statusCode: 200, cartResponse})
    } catch (error) {
        return response.status(500).json({ msg: 'Error while fetching cart'}) 
    }
}