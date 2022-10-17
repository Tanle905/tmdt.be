import { Request } from "express";
import { Model } from "mongoose";

export interface Role {
  role: string;
}

interface UserBody extends User {
  data?: any;
}

export interface UserRequest extends Request {
  body: UserBody;
  params: { userId?: string };
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
  isDeactivated?: boolean;
}

export interface UserModelInterface extends Model<User> {
  extractUserData: (payload: User) => User;
}
