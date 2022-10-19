import mongoose, { Schema } from "mongoose";
import { Favorite, FavoriteDetails } from "../interface/favorite.interface";

export const cartDataSchema: Schema = new mongoose.Schema<Favorite>(
  {
    userId: {
      type: String,
      required: true,
    },
    productsList: [String],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const FavoriteModel = mongoose.model("Favorite", cartDataSchema);
