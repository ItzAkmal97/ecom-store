import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
const stripe = new Stripe(
  "sk_test_51QQ0a1JNKAgioTIIyuqzwX1x51dfnhHdNeC1s7HxMreE8QwAqQen6y9FnFJmVkRxGYZbUu4d4JqmH579EBW67bi500ZUdngC4e"
);

app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount, email, name } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
      receipt_email: email,
      metadata: {
        name: name,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
