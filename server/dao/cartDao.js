import Cart from "../model/cart.js"

export const addProductToCartDao = async (cartDetails) => {
    try {
        const cart = Cart(cartDetails)
        const cartResponse = cart.save()
        return cartResponse
    } catch (error) {
        return error
    }
}

export const getCartDao = async (id) => {
    try {
        const cartResponse = await Cart.find({"_id":"63b92b16727ec6c6447c929c"})
        console.log("... ", cartResponse)
        return cartResponse
    } catch (error) {
        return error
    }
}

