import { Product } from "../interface/product.interface";

export interface Review{
    username: string;
    userId:string;
    productId:string;
    stars: number;
    imageUrl: string[];
    description: string;
}