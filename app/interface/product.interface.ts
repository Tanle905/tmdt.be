import { Request } from "express";
import { Model, ObjectId } from "mongoose";

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

export interface ProductRequest extends Request {
  query: ProductQuery;
  params: ProductParams;
  body: Product;
}

export interface ProductModel extends Model<Product> {
  extractProductData: (payload: Product) => any;
}
