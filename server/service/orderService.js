import { checkoutDao } from "../dao/orderDao.js";
import Razorpay from "razorpay";
import crypto from "crypto";

export const checkoutService = async (orderDetails) => {
  try {
    // const orderResponse = await checkoutDao(orderDetails)
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: orderDetails.amount,
      currency: "INR",
      // reciept: crypto.randomBytes(10).toString("hex")
    };

    const orderResponse = await instance.orders.create(options);
    return orderResponse;
  } catch (error) {
    return error;
  }
};

export const paymentVerifyService = async (verificationDetails) => {
  try {
    console.log("heer oin  service.... ", verificationDetails)
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      verificationDetails.data;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return {
        razorpay_order_id,
        isTrue: true,
      };
    } else {
      return {
        razorpay_order_id,
        isTrue: false,
      };
    }
  } catch (error) {}
};
