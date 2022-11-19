import { Request } from "express";
import { Model } from "mongoose";
import { ProductModel } from "../model/product.model";
import { Review } from "./review.interface";

export interface Product {
  _id?: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  isFavorite?: boolean;
  productQuantity: number;
  numberSold?: number;
  review?: Review[];
  totalReviews: number;
}

export interface ProductParams {
  [key: string]: any;
  id: string;
}

export interface ProductQuery {
  [key: string]: any;
  page: number;
  pageSize: number;
  title: string;
  price: string;
  isFavorite: boolean;
  sortBy: string;
  isAsc: number;
  idArray: string;
}

export interface ProductBody extends Product {
  idArray?: string;
}

export interface ProductRequest extends Request {
  query: ProductQuery;
  params: ProductParams;
  body: ProductBody;
}

export interface ProductModel extends Model<Product> {
  extractProductData: (payload: Product) => any;
}
