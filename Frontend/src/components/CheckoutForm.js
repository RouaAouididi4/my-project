// components/CheckoutForm.js
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const res = await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1000, // 10 TND = 1000 millimes
          paymentMethod,
        }),
      });

      const result = await res.json();
      if (result.success) {
        alert("✅ Payment successful!");
      } else {
        alert("❌ Payment failed.");
      }
    } else {
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-4 shadow-md bg-white rounded"
    >
      <h2 className="text-lg font-bold mb-4">Pay 10 TND</h2>
      <CardElement className="p-2 border rounded mb-4" />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
