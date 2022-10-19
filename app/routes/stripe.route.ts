import { Router } from "express";
import { CHECKOUT_STRIPE_ROUTE } from "../constants and enums/endpoint";
import { stripeController } from "../controller/stripe.controller";

export const stripeRouter = Router();
stripeRouter
  .route(CHECKOUT_STRIPE_ROUTE.PAYMENT_INTENTS.BASE)
  .post(stripeController.createPaymentIntents);
stripeRouter
  .route(
    CHECKOUT_STRIPE_ROUTE.PAYMENT_INTENTS.BASE +
      CHECKOUT_STRIPE_ROUTE.PAYMENT_INTENTS.ID.BASE +
      CHECKOUT_STRIPE_ROUTE.PAYMENT_INTENTS.ID.CONFIRM
  )
  .post(stripeController.confirmPaymentIntents);
