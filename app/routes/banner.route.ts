import { Router } from "express";
import { BANNER_ROUTE } from "../constants and enums/endpoint";
import { bannerController } from "../controller/banner.controller";
import { authJwt } from "../middleware/authJwt";

export const bannerRouter = Router();

bannerRouter.route(BANNER_ROUTE.BASE).get(bannerController.get);

bannerRouter
  .route(BANNER_ROUTE.BASE)
  .all(authJwt.verifyToken, authJwt.isAdmin)
  .post(bannerController.post);
