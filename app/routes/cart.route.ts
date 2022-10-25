import { Router } from "express";
import { CART_ROUTE } from "../constants and enums/endpoint";
import { cartController } from "../controller/cart.controller";
import { authJwt } from "../middleware/authJwt";
import { verifyStatus } from "../middleware/verifyStatus";

export const cartRouter = Router();

cartRouter
  .route(CART_ROUTE.BASE)
  .all(authJwt.verifyToken, verifyStatus.isNotDeactivated)
  .get(cartController.get)
  .post(cartController.post)
  .put(cartController.updateItemInCart)
  .delete(cartController.deleteProductInCart);

cartRouter
  .route(CART_ROUTE.ID)
  .all(authJwt.verifyToken, verifyStatus.isNotDeactivated)
  .delete(cartController.deleteById);
