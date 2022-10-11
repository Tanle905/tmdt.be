import { Request } from "express";
import { Model, ObjectId } from "mongoose";
import { ProductModel } from "../model/product.model";

export interface Product {
  _id?: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  isFavorite?: boolean;
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
  isAsc: boolean;
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
