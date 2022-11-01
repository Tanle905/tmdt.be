import { Response } from "express";
import { ObjectId } from "mongodb";
import { UserRequest } from "../interface/user_and_roles.interface";
import { OrderModel } from "../model/order.model";
import { ProductModel } from "../model/product.model";
import { UserModel } from "../model/user.model";

export const userProfileController = {
  get: async (req: UserRequest, res: Response) => {
    const { userId } = res.locals;

    try {
      UserModel.findById(new ObjectId(userId))
        .select("-password")
        .populate("roles", "-__v")
        .exec((error, user: any) => {
          if (error) return res.status(400).json({ message: error });
          if (!user)
            return res.status(404).json({ message: "User Not found!" });
          const authorities = [];
          for (let i = 0; i < user.roles.length; i++) {
            authorities.push(user.roles[i].name);
          }
          return res
            .status(200)
            .json({ ...user.toObject(), roles: authorities });
        });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  put: async (req: UserRequest, res: Response) => {
    const { userId } = res.locals;

    try {
      const profileData = UserModel.extractUserData(req.body);
      const address = profileData.address;
      const order = profileData.order;
      if (profileData.order) {
        const order = new OrderModel({ ...profileData.order, userId });
        for (const item of order.items) {
          console.log(item._id)
          await ProductModel.findByIdAndUpdate(
            new ObjectId(item._id),
            {
              $set: {
                numberSold: item.numberSold ? item.numberSold+=1 : 1,
                productQuantity: (item.productQuantity -= item.quantity),
              },
            },
          );
        }
        await order.save();
      }
      delete profileData.address;
      delete profileData.order;
      UserModel.findByIdAndUpdate(
        new ObjectId(userId),
        {
          $set: profileData,
          ...(address ? { $push: { address: address } } : {}),
          ...(order ? { $push: { order: order } } : {}),
        },
        {
          returnDocument: "after",
        }
      )
        .select("-password")
        .populate("roles", "-__v")
        .exec(async (error, user: any) => {
          if (error) return res.status(400).json({ message: error });
          if (!user)
            return res.status(404).json({ message: "User Not found!" });
          const authorities = [];
          for (let i = 0; i < user.roles.length; i++) {
            authorities.push(user.roles[i].name);
          }
          return res
            .status(200)
            .json({ ...user.toObject(), roles: authorities });
        });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
