import { Router } from "express";
import { PRODUCT_ROUTE } from "../constants and enums/endpoint";
import { productController } from "../controller/product.controller";
import { authJwt } from "../middleware/authJwt";

export const productRouter = Router();
productRouter
  .route(PRODUCT_ROUTE.BASE)
  .get(productController.get)
  .delete(productController.delete);

productRouter
  .route(PRODUCT_ROUTE.ID)
  .get(productController.getById)
  .delete(productController.deleteById);

productRouter
  .route(PRODUCT_ROUTE.BASE)
  .all(authJwt.verifyToken, authJwt.isAdmin)
  .post(productController.post);

productRouter
  .route(PRODUCT_ROUTE.ID)
  .all(authJwt.verifyToken, authJwt.isAdmin)
  .put(productController.put);
