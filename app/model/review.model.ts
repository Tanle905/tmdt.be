import mongoose, { Schema } from "mongoose";
import { Review } from "../interface/review.interface";

export const reviewDataSchema: Schema = new mongoose.Schema<Review>(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: [String],
    },
    description: {
      type: String,
    },
    stars: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const ReviewModel = mongoose.model<Review>("Review", reviewDataSchema);
