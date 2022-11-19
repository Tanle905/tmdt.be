import { Request } from "express";
import { Model } from "mongoose";
import { Address } from "./address.interface";
import { OrderDetails } from "./order.interface";
import { Review } from "./review.interface";

export interface Role {
  role: string;
}

interface UserBody extends User {
  data: any;
}

export interface UserRequest extends Request {
  body: UserBody;
  params: { userId: string; id: string };
}

export interface User {
  username: string;
  email: string;
  roles?: string[];
  password: string;
  address?: Address[];
  order?: OrderDetails[];
  imageUrl?: string;
  phoneNumber?: number;
  payment?: string;
  isDeactivated?: boolean;
  review: Review[];
}

export interface UserModelInterface extends Model<User> {
  extractUserData: (payload: User) => User;
}
