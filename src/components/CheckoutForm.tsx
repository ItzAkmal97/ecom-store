import React, { FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";
import { clearCart } from "../features/cartSlice";
import {
  setName,
  setEmail,
  setProcessing,
  setError,
  setSuccess,
} from "../features/stripeSlice";
import { useSelector, useDispatch } from "react-redux";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const { name, email, processing, error, success } = useSelector(
    (state: RootState) => state.stripe
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      dispatch(setError("Stripe has not loaded"));
      return;
    }

    dispatch(setProcessing(true));
    dispatch(setError(null));

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const response = await fetch(
        "http://localhost:5000/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Math.round(totalAmount * 100),
            email,
            name,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Payment intent creation failed");
      }

      const { clientSecret } = await response.json();

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            email,
          },
        },
      });

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message || "Payment failed");
      }

      dispatch(setSuccess(true));
      dispatch(setProcessing(false));
      setTimeout(() => {
        dispatch(clearCart());
        navigate("/");
      }, 2000);
    } catch (err) {
      dispatch(
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        )
      );
      console.error("Payment Error:", err);
      dispatch(setProcessing(false));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="pr-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 object-cover"
            />
            <div className="ml-4 flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-500">${item.price.toFixed(2)}</p>
            </div>
            <div className="ml-4">
              {`${item.quantity} x ${item.price.toFixed(2)}`}
            </div>
          </div>
        ))}
        {items.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total</span>
            <span className="font-medium">${totalAmount.toFixed(2)}</span>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Payment Form
        </h2>
        {success ? (
          <div className="text-green-600 text-center">
            Payment Successful! Thank you for your purchase.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => dispatch(setName(e.target.value))}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="Email Address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Details
              </label>
              <div className="mt-1 border border-gray-300 rounded-md p-3">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={processing}
              className={`w-full py-3 rounded-md text-white font-semibold ${
                processing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {processing ? "Processing..." : "Pay Now"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
