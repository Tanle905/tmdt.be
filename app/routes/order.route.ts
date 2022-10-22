import { Router } from "express";
import { USER_PROFILE_ROUTE } from "../constants and enums/endpoint";
import { orderController } from "../controller/order.controller";
import { authJwt } from "../middleware/authJwt";
import { verifyStatus } from "../middleware/verifyStatus";

export const orderRouter = Router();

orderRouter
  .route(USER_PROFILE_ROUTE.ORDER.BASE)
  .all(authJwt.verifyToken, verifyStatus.isNotDeactivated)
  .get(orderController.get);
