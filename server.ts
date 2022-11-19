import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "./app/config";
import mongoose from "mongoose";
import { productRouter } from "./app/routes/product.route";
import {
  AUTH_ENDPOINT,
  CART_ENDPOINT,
  CHECKOUT_STRIPE_ENDPOINT,
  PRODUCT_ENDPOINT,
  USER_PROFILE_ENDPOINT,
  USER_MANAGEMENT_ENDPOINT,
  FAVORITE_ENDPOINT,
  BANNER_ENDPOINT,
  REVIEW_ENDPOINT,
} from "./app/constants and enums/endpoint";
import { authRouter } from "./app/routes/auth.route";
import { cartRouter } from "./app/routes/cart.route";
import { stripeRouter } from "./app/routes/stripe.route";
import { profileRouter } from "./app/routes/user_profile.route";
import { userManagementRouter } from "./app/routes/user_management.route";
import { favoriteRouter } from "./app/routes/favorite.route";
import { addressRouter } from "./app/routes/address.route";
import { orderRouter } from "./app/routes/order.route";
import { bannerRouter } from "./app/routes/banner.route";
import { reviewRouter } from "./app/routes/review.route";

//Config
const app: Application = express();
const port = config.app.port;
const mongoString = config.app.databaseUrl as string;
mongoose.connect(mongoString);
export const database = mongoose.connection;
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(AUTH_ENDPOINT, authRouter);
app.use(PRODUCT_ENDPOINT, productRouter);
app.use(REVIEW_ENDPOINT, reviewRouter);
app.use(BANNER_ENDPOINT, bannerRouter);
app.use(CART_ENDPOINT, cartRouter);
app.use(USER_PROFILE_ENDPOINT, profileRouter);
app.use(USER_PROFILE_ENDPOINT, addressRouter);
app.use(USER_PROFILE_ENDPOINT, orderRouter);
app.use(CHECKOUT_STRIPE_ENDPOINT, stripeRouter);
app.use(USER_MANAGEMENT_ENDPOINT, userManagementRouter);
app.use(FAVORITE_ENDPOINT, favoriteRouter);

app.listen(port, () => {});
