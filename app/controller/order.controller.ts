import {  Response } from "express";
import { ObjectId } from "mongodb";
import { UserRequest } from "../interface/user_and_roles.interface";
import { UserModel } from "../model/user.model";

export const orderController = {
    get: async (req: UserRequest, res: Response) => {
        const { userId } = res.locals;
    
        try {
          UserModel.findById(new ObjectId(userId)).exec((error, user: any) => {
            if (error) return res.status(400).json({ message: error });
            if (!user)
              return res.status(404).json({ message: "Order Not found!" });
            return res.status(200).json({ data: user.toObject().order });
          });
        } catch (error) {
          return res.status(500).json({ message: error });
        }
      },
};
