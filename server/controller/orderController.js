import {
  checkoutService,
  paymentVerifyService,
} from "../service/orderService.js";

export const checkoutController = async (request, response) => {
  try {
    const orderResponse = await checkoutService(request.body);
    return response
      .status(200)
      .json({
        statusCode: 200,
        msg: `Payment for ${orderResponse.id} successfull`,
        orderResponse,
      });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: `Error while payment for ${orderResponse.id}` });
  }
};

export const paymentVerifyController = async (request, response) => {
  try {
    const verifyResponse = await paymentVerifyService(request.body);
    if (!verifyResponse.isTrue) {
      return response
        .status(500)
        .json({
          msg: `Payment verification for ${verifyResponse.razorpay_order_id} failed`,
        });
    }
    return response
      .status(200)
      .json({
        statusCode: 200,
        msg: `Payment for ${verifyResponse.razorpay_order_id} verified successfully`,
        verifyResponse,
      });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Error while payment verification" });
  }
};
