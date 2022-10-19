import { Request, Response } from "express";
import { Stripe } from "stripe";
import { config } from "../config";

const stripe = new Stripe(config.app.stripeSecretKey as string, {
  apiVersion: "2022-08-01",
});

export const stripeController = {
  createPaymentIntents: async (req: Request, res: Response) => {
    const { paymentMethodId, totalPrice, currency, useStripeSDK } = req.body;
    try {
      const orderAmount = totalPrice * 100;
      if (paymentMethodId) {
        const params: Stripe.PaymentIntentCreateParams = {
          amount: orderAmount,
          confirm: true,
          confirmation_method: "manual",
          currency,
          payment_method: paymentMethodId,
          use_stripe_sdk: useStripeSDK,
        };
        const intent = await stripe.paymentIntents.create(params);

        return res.status(200).json(generateResponse(intent));
      }
      return res
        .status(400)
        .json({ message: "Please provides a payment method!" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  confirmPaymentIntents: async (req: Request, res: Response) => {
    const { paymentIntentId } = req.body;
    try {
      if (paymentIntentId) {
        const intent = await stripe.paymentIntents.confirm(paymentIntentId);
        return res.status(200).json(generateResponse(intent));
      }
      return res
        .status(400)
        .json({ message: "Please provides a payment method!" });
    } catch (error) {}
  },
};

function generateResponse(intent: Stripe.Response<Stripe.PaymentIntent>) {
  switch (intent.status) {
    case "requires_action":
      return {
        clientSecret: intent.client_secret,
        reuqiresAction: true,
        status: intent.status,
      };
    case "requires_payment_method":
      return {
        message: "Please provide another payment method!",
      };
    case "succeeded":
      return { clientSecret: intent.client_secret, status: intent.status };
  }
  return { message: "Failed!" };
}
