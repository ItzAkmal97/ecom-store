import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./index.css";
import App from "./App.tsx";

const stripePromise = loadStripe("pk_test_51QQ0a1JNKAgioTIIrYebZfXORts5HSrwBnoZL6oAjs1Wtkt0tudYb61YDBNeht3H3RB9dfbqbYsmMYUMFeiwArER00YoPFbgfo");

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <Elements stripe={stripePromise}>
      <App />
      </Elements>
    </StrictMode>
  </Provider>
);
