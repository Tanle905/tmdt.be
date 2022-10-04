import { Router } from "express";
import { AUTH_ROUTE } from "../constants and enums/endpoint";
import { authController } from "../controller/auth.controller";
import { verifySignUp } from "../middleware/verifySignUp";

export const authRouter = Router();

authRouter
  .route(AUTH_ROUTE.SIGNUP)
  .post(
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    authController.signup
  );

authRouter.route(AUTH_ROUTE.LOGIN).post(authController.signin);
