import mongoose, { Schema } from "mongoose";
import { Cart, CartDetails } from "../interface/cart.interface";

export const cartDataSchema: Schema = new mongoose.Schema<Cart>(
  {
    userId: {
      type: String,
      required: true,
    },
    productsList: [
      new Schema<CartDetails>({
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      }),
    ],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    statics: {
      extractCartData(payload: any) {
        Object.keys(payload).forEach(
          (key: string) => payload[key] === undefined && delete payload[key]
        );

        return payload;
      },
    },
  }
);

export const CartModel = mongoose.model<Cart>("Cart", cartDataSchema);
