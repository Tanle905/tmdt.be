import { Router } from "express";
import { PRODUCT_ROUTE } from "../constants and enums/endpoint";
import { productController } from "../controller/product.controller";
import { authJwt } from "../middleware/authJwt";
import { decodeToken } from "../middleware/decodeToken";
import { verifyStatus } from "../middleware/verifyStatus";

export const productRouter = Router();
productRouter
  .route(PRODUCT_ROUTE.BASE)
  .all(decodeToken.decodeToken)
  .get(productController.get);

productRouter.route(PRODUCT_ROUTE.ID).get(productController.getById);

productRouter
  .route(PRODUCT_ROUTE.BASE)
  .all(authJwt.verifyToken, authJwt.isAdmin, verifyStatus.isNotDeactivated)
  .post(productController.post)
  .delete(productController.delete);

productRouter
  .route(PRODUCT_ROUTE.ID)
  .all(authJwt.verifyToken, authJwt.isAdmin, verifyStatus.isNotDeactivated)
  .put(productController.put)
  .delete(productController.deleteById);
