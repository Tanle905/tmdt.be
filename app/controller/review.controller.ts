import { Request, Response } from "express";
import { ProductModel } from "../model/product.model";
import { ReviewModel } from "../model/review.model";
import { UserModel } from "../model/user.model";

export const reviewController = {
  getReviewById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!id)
        return res.status(400).json({ message: "Please provide an id!!!" });
      const document = await ReviewModel.findById(id);
      if (!document)
        return res.status(404).json({ message: "Review not found!!!" });
      else return res.status(200).json({ data: document });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  addReview: async (req: Request, res: Response) => {
    const { id } = req.params;
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
      const document = await ProductModel.findByIdAndUpdate(
        id,
        { $push: { review: review } },
        { returnDocument: "after" }
      );
      await UserModel.findByIdAndUpdate(userId, { $push: { review: review } });

      return res.status(500).json(document);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};
