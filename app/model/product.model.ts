import mongoose, { Schema } from "mongoose";
import {
  Product,
  ProductModel as ProductModelInterface,
} from "../interface/product.interface";

export const productDataSchema: Schema = new mongoose.Schema<Product>(
  {
    title: {
      type: String,
      index: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
    productQuantity: {
      type: Number,
      required: true,
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

productDataSchema.path("title").index({ text: true });

export const ProductModel = mongoose.model<Product, ProductModelInterface>(
  "Product",
  productDataSchema
);
