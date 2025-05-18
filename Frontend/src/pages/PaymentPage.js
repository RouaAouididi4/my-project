// pages/PaymentPage.js
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY"); // 🔑

function PaymentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default PaymentPage;
