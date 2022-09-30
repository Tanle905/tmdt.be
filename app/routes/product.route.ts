import { Router } from "express";
import { PRODUCT_ROUTE } from "../constants and enums/endpoint";
import { productController } from "../controller/product.controller";

export const productRouter = Router();
productRouter
  .route(PRODUCT_ROUTE.BASE)
  .get(productController.get)
  .post(productController.post)
  .delete(productController.delete);

productRouter
  .route(PRODUCT_ROUTE.ID)
  .get(productController.getById)
  .put(productController.put)
  .delete(productController.deleteById);
