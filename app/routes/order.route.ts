import { Router } from "express";
import { ORDER_MANAGEMENT_ROUTE, USER_PROFILE_ROUTE } from "../constants and enums/endpoint";
import { orderController } from "../controller/order.controller";
import { authJwt } from "../middleware/authJwt";
import { verifyStatus } from "../middleware/verifyStatus";

export const orderRouter = Router();

orderRouter
  .route(ORDER_MANAGEMENT_ROUTE.BASE)
  .all(authJwt.verifyToken, verifyStatus.isNotDeactivated)
  .get(orderController.get);
