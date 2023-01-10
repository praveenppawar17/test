import { addProductToCartDao, getCartDao } from "../dao/cartDao.js"

export const addProductToCartService = async(cartDetails) => {
    try {
        const cartResponse = await addProductToCartDao(cartDetails)
        return cartResponse
    } catch (error) {
        return error
    }
}

export const getCartService = async (id) => {
    try {
        const cartResponse = await getCartDao(id)
        return cartResponse
    } catch (error) {
        return error
    }
}