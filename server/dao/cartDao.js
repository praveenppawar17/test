import Cart from "../model/cart.js"

export const addProductToCartDao = async (cartDetails) => {
    try {
        console.log("cart details.... ", cartDetails.products[0].productId)
        console.log("userid.... ", cartDetails.userId)
        const cart = await Cart.findOne({"userId":cartDetails.userId})
        console.log("cart response... ", cart)
        if(cart){

            const itemIndex = cart.products.findIndex(item => item.productId.toString() === cartDetails.products[0].productId)
            console.log("itemindexid is,,,, ", itemIndex)

            if(itemIndex > -1){
                let product = cart.products[itemIndex]
                console.log("single product.here.... ",  product)
                product.quantity += cartDetails.products[0].quantity;
                console.log("quantity update in product... ", product)
                let bill = cart.products.reduce((acc,cur) => {
                    return acc + cur.quantity * cur.price
                },0)
                product.bill = Math.round(bill)
                console.log("how does bill look here... ", product)
                cart.products[itemIndex] = product
                const cartResponse = cart.save()
                return cartResponse
            }else{
                cart.products.push({productId:cartDetails.products[0].productId, quantity:cartDetails.products[0].quantity, price:cartDetails.products[0].price})
                let bill = cart.products.reduce((acc,cur) => {
                    return acc + cur.quantity * cur.price
                },0)
                cart.bill = Math.round(bill)
                console.log("how does bill look here... ", cart)
                const cartResponse = await cart.save()
                return cartResponse
            }
        }else{
            console.log("cardetails.... ", cartDetails)
            const newCart = await Cart.create({
                userId: cartDetails.userId,
                products: cartDetails.products,
                bill: Math.round(cartDetails.products[0].quantity * cartDetails.products[0].price)
            })
            return newCart
        }
    } catch (error) {
        return error
    }
}

export const getCartDao = async (userId) => {
    try {
        const cartResponse = await Cart.findOne({"userId":userId})
        .populate("products.productId")
        console.log("... ", cartResponse)
        return cartResponse
    } catch (error) {
        return error
    }
}


