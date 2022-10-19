import { Router } from "express";
import { FAVORITE_ROUTE } from "../constants and enums/endpoint";
import { favoriteController } from "../controller/favorite.controller";
import { authJwt } from "../middleware/authJwt";
import { verifyStatus } from "../middleware/verifyStatus";

export const favoriteRouter = Router();

favoriteRouter
  .route(FAVORITE_ROUTE.BASE)
  .all(authJwt.verifyToken, verifyStatus.isNotDeactivated)
  .get(favoriteController.get)
  .put(favoriteController.put);
