import { Router } from "express";
import { USER_PROFILE_ROUTE } from "../constants and enums/endpoint";
import { userProfileController } from "../controller/user_profile.controller";
import { authJwt } from "../middleware/authJwt";
import { verifyStatus } from "../middleware/verifyStatus";

export const profileRouter = Router();

profileRouter
  .route(USER_PROFILE_ROUTE.BASE)
  .all(authJwt.verifyToken, verifyStatus.isNotDeactivated)
  .get(userProfileController.get)
  .put(userProfileController.put);

profileRouter
  .route(USER_PROFILE_ROUTE.ADDRESS)
  .all(authJwt.verifyToken, verifyStatus.isNotDeactivated)
  .get(userProfileController.getAddress)
  .delete(userProfileController.deleteAddress);
