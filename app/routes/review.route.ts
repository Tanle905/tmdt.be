import { Router } from "express";
import { REVIEW_ROUTE } from "../constants and enums/endpoint";
import { reviewController } from "../controller/review.controller";
import { authJwt } from "../middleware/authJwt";

export const reviewRouter = Router();
reviewRouter
  .route(REVIEW_ROUTE.PRODUCT)
  .get(reviewController.getReviewByProductId);

reviewRouter
  .route(REVIEW_ROUTE.USER)
  .all(authJwt.verifyToken)
  .get(reviewController.getReviewByUserId);

reviewRouter
  .route(REVIEW_ROUTE.BASE)
  .all(authJwt.verifyToken)
  .post(reviewController.addReview);
