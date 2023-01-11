import { addProductToCartDao, getCartDao } from "../dao/cartDao.js"

export const addProductToCartService = async(cartDetails) => {
    try {
        const cartResponse = await addProductToCartDao(cartDetails)
        return cartResponse
    } catch (error) {
        return error
    }
}

export const getCartService = async (userId) => {
    try {
        const cartResponse = await getCartDao(userId)
        return cartResponse
    } catch (error) {
        return error
    }
}