import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "./app/config";
import mongoose from "mongoose";
import { productRouter } from "./app/routes/product.route";
import { PRODUCT_ENDPOINT } from "./app/constants and enums/endpoint";

//Config
const app: Application = express();
const port = config.app.port;
const mongoString = config.app.databaseUrl as string;
mongoose.connect(mongoString);
const database = mongoose.connection;
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(PRODUCT_ENDPOINT, productRouter)

app.listen(port, () => {
});
