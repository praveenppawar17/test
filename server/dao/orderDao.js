import Cart from "../model/cart.js";

export const checkoutDao = async (orderDetails) => {
  try {
    const cart = await Cart.findOne({ userId: orderDetails.userId }).populate(
      "userId"
    );
    console.log("cart info... ", cart);
    if (cart) {
    }
  } catch (error) {}
};
