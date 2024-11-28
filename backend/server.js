import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe("sk_test_51QQ0a1JNKAgioTIIyuqzwX1x51dfnhHdNeC1s7HxMreE8QwAqQen6y9FnFJmVkRxGYZbUu4d4JqmH579EBW67bi500ZUdngC4e");

app.use(cors());
app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
