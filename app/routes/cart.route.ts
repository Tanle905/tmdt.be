import { Router } from "express";
import { CART_ROUTE } from "../constants and enums/endpoint";
import { cartController } from "../controller/cart.controller";
import { authJwt } from "../middleware/authJwt";
import { verifyStatus } from "../middleware/verifyStatus";

export const cartRouter = Router();

cartRouter
  .route(CART_ROUTE.BASE)
  .all(authJwt.verifyToken, verifyStatus.isNotDeactivated)
  .get(cartController.getById)
  .post(cartController.postById)
  .put(cartController.updateItemInCart)
  .delete(cartController.deleteProductInCart);
