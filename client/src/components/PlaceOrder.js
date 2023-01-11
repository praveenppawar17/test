import { Button } from "@mui/material";
import React from "react";
import { makePayment, verifyPayment } from "../service/api";

const PlaceOrder = () => {
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await makePayment({ amount: 500 });
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data.orderResponse;
    console.log(amount, order_id, currency);
    const options = {
      key: process.env.KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "praveen",
      description: "payment for product.....",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await verifyPayment(data);
        alert(result.data.msg);
      },
      //   temporary static details
      prefill: {
        name: "praveen",
        email: "example@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Example Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <header>
        <Button onClick={displayRazorpay}>Place Order</Button>
      </header>
    </>
  );
};

export default PlaceOrder;
