import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "./app/config";
import mongoose from "mongoose";
import { productRouter } from "./app/routes/product.route";
import {
  AUTH_ENDPOINT,
  CART_ENDPOINT,
<<<<<<< HEAD
  CHECKOUT_STRIPE_ENDPOINT,
=======
  FAVORITE_ENDPOINT,
>>>>>>> d16a59a2d34925c2368e3707107b4046bba31c4a
  PRODUCT_ENDPOINT,
  USER_PROFILE_ENDPOINT,
  USER_MANAGEMENT_ENDPOINT,
} from "./app/constants and enums/endpoint";
import { authRouter } from "./app/routes/auth.route";
import { cartRouter } from "./app/routes/cart.route";
<<<<<<< HEAD
import { profileRouter } from "./app/routes/profile.route";
import { stripeRouter } from "./app/routes/stripe.route";
=======
import { profileRouter } from "./app/routes/user_profile.route";
import { userManagementRouter } from "./app/routes/user_management.route";
import { favoriteRouter } from "./app/routes/favorite.route";
>>>>>>> d16a59a2d34925c2368e3707107b4046bba31c4a

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
app.use(CART_ENDPOINT, cartRouter);
<<<<<<< HEAD
app.use(PROFILE_ENDPOINT, profileRouter);
app.use(CHECKOUT_STRIPE_ENDPOINT, stripeRouter);
=======
app.use(USER_PROFILE_ENDPOINT, profileRouter);
app.use(USER_MANAGEMENT_ENDPOINT, userManagementRouter);
app.use(FAVORITE_ENDPOINT, favoriteRouter);
>>>>>>> d16a59a2d34925c2368e3707107b4046bba31c4a

app.listen(port, () => {});
