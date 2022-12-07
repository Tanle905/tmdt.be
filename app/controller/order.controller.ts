import { Response } from "express";
import { ObjectId } from "mongodb";
import { UserRequest } from "../interface/user_and_roles.interface";
import { OrderModel } from "../model/order.model";
import { UserModel } from "../model/user.model";

export const orderController = {
  get: async (req: UserRequest, res: Response) => {

    try {
      OrderModel.find({}).exec((error, order) => {
        if (error) return res.status(400).json({ message: error });
        if (!order) return res.status(404).json({ message: "Order Not found!" });
        return res.status(200).json({ data: order });
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};
