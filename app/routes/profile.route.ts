import { Router } from "express";
import { PROFILE_ROUTE } from "../constants and enums/endpoint";
import { profileController } from "../controller/profile.controller";
import { authJwt } from "../middleware/authJwt";

export const profileRouter = Router();

profileRouter
  .route(PROFILE_ROUTE.BASE)
  .all(authJwt.verifyToken)
  .get(profileController.get)
  .put(profileController.put);
