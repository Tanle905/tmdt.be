import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "./app/config";
import mongoose from "mongoose";
import { productRouter } from "./app/routes/product.route";
import {
  AUTH_ENDPOINT,
  CART_ENDPOINT,
  PRODUCT_ENDPOINT,
} from "./app/constants and enums/endpoint";
import { authRouter } from "./app/routes/auth.route";
import { cartRouter } from "./app/routes/cart.route";

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

app.listen(port, () => {});
