import { Request, Response } from "express";
import { ProductModel } from "../model/product.model";
import { ReviewModel } from "../model/review.model";
import { UserModel } from "../model/user.model";

export const reviewController = {
  getReviewByProductId: async (req: Request, res: Response) => {
    const { productId } = req.params;
    try {
      if (!productId)
        return res.status(400).json({ message: "Please provide an id!!!" });
      const document = await ReviewModel.find({ productId: productId });
      if (!document)
        return res.status(404).json({ message: "Review not found!!!" });
      else return res.status(200).json({ data: document });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  getReviewByUserId: async (req: Request, res: Response) => {
    const { userId } = res.locals;
    try {
      if (!userId)
        return res.status(400).json({ message: "Please provide an id!!!" });
      const document = await ReviewModel.find({ userId });
      if (!document)
        return res.status(404).json({ message: "Review not found!!!" });
      else return res.status(200).json({ data: document });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  addReview: async (req: Request, res: Response) => {
    const { userId, description, imageUrl, productId, stars, username } =
      req.body;
    try {
      const review = new ReviewModel({
        userId,
        description,
        imageUrl,
        productId,
        stars,
        username,
      });
      ProductModel.findById(productId).exec(async (error, product) => {
        if (error) return res.status(500).json({ message: error });
        await UserModel.findByIdAndUpdate(userId, {
          $push: { review },
        });
        await review.save();
        await product.updateOne(
          { $inc: { totalReviews: 1 } },
          { upsert: true }
        );
        if (product.review.length < 2) {
          await product.updateOne(
            { $push: { review } },
            { returnDocument: "after" }
          );
        }
        return res.status(200).json(review);
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};
