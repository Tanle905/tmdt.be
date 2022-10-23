import mongoose, { Schema } from "mongoose";
import { OrderDetails } from "../interface/order.interface";
import { addressDataSchema } from "./address.model";
import { productDataSchema } from "./product.model";

export const orderDataSchema: Schema = new mongoose.Schema<OrderDetails>(
  {
    userId: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    items: [productDataSchema],
    address: addressDataSchema,
    paymentStatus: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

export const OrderModel = mongoose.model<OrderDetails>(
  "Order",
  orderDataSchema
);
