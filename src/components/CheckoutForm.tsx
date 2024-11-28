import { useState, FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";



function CheckoutForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create payment method
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name,
          email,
        },
      });

      if (error) {
        setError(error.message || 'Payment failed');
        setProcessing(false);
        return;
      }

      // Here you would typically send the paymentMethod.id to your backend
      console.log('Payment Method Created:', paymentMethod);

      // Simulate payment processing
      alert('Payment successful!');
      
      // Reset form
      setName('');
      setEmail('');
      cardElement.clear();
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Payment Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="card" className="block text-sm font-medium text-gray-700 mb-1">
            Card Details
          </label>
          <div className="border border-gray-300 rounded-md p-3">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={processing || !stripe}
          className={`w-full py-3 rounded-md text-white font-semibold ${
            processing || !stripe 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
