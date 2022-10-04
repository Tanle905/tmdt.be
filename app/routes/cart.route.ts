import { Router } from "express";
import { CART_ROUTE } from "../constants and enums/endpoint";
import { cartController } from "../controller/cart.controller";
import { authJwt } from "../middleware/authJwt";

export const cartRouter = Router();

cartRouter
  .route(CART_ROUTE.BASE)
  .all(authJwt.verifyToken)
  .get(cartController.getById)
  .post(cartController.postById);
