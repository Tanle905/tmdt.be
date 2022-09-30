import mongoose, { Schema } from "mongoose";
import {
  Product,
  ProductModel as ProductModelInterface,
} from "../interface/product.interface";

export const productDataSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
    isFavorite: {
      type: Boolean,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    statics: {
      extractProductData(payload: any) {
        Object.keys(payload).forEach(
          (key: string) => payload[key] === undefined && delete payload[key]
        );

        return payload;
      },
    },
  }
);

export const ProductModel = mongoose.model<Product, ProductModelInterface>(
  "Product",
  productDataSchema
);
