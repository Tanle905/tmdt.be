import { Router } from "express";
import { USER_PROFILE_ROUTE } from "../constants and enums/endpoint";
import { addressController } from "../controller/address.controller";
import { authJwt } from "../middleware/authJwt";
import { verifyStatus } from "../middleware/verifyStatus";

export const addressRouter = Router();
addressRouter
  .route(USER_PROFILE_ROUTE.ADDRESS.BASE)
  .all(authJwt.verifyToken, verifyStatus.isNotDeactivated)
  .get(addressController.get);

addressRouter
  .route(USER_PROFILE_ROUTE.ADDRESS.BASE + USER_PROFILE_ROUTE.ADDRESS.ID)
  .all(authJwt.verifyToken, verifyStatus.isNotDeactivated)
  .put(addressController.put)
  .delete(addressController.delete);
