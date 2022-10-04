import { Request } from "express";
import { Model } from "mongoose";

export interface Cart {
  userId: string;
  productsList: CartDetails[];
}

export interface CartDetails {
  productId: string;
  quantity: number;
}

export interface CartRequestParams {
  [key: string]: string;
  userId: string;
}

export interface CartRequestBody {
  data: CartDetails[];
}

export interface CartRequest extends Request {
  params: CartRequestParams;
  body: CartRequestBody;
}

export interface CartModel extends Model<CartDetails> {
  extractCartData: (payload: CartDetails) => any;
}
