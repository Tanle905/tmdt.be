import { Request } from "express";
import { Model } from "mongoose";

export interface Role {
  role: string;
}

export interface UserRequest extends Request {
  body: User;
  userId?: string;
}

export interface User {
  username: string;
  email: string;
  roles?: string[];
  password: string;
  address?: string;
  imageUrl?: string;
  phoneNumber?: number;
  payment?: string;
}

export interface UserModelInterface extends Model<User> {
  extractUserData: (payload: User) => any;
}
