import { Request } from "express";

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
  password: string;
  imageUrl: String;
  roles: string[];
}
