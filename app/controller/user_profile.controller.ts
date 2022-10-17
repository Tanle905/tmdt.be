import { Response } from "express";
import { ObjectId } from "mongodb";
import { User, UserRequest } from "../interface/user_and_roles.interface";
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
            return res.status(404).json({ message: "User Not found." });
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
      delete profileData.address;
      UserModel.findByIdAndUpdate(
        new ObjectId(userId),
        {
          $set: profileData,
          ...(address ? { $push: { address: address } } : {}),
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
            return res.status(404).json({ message: "User Not found." });
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
  getAddress: async (req: UserRequest, res: Response) => {
    const { userId } = res.locals;

    try {
      UserModel.findById(new ObjectId(userId))
        .select("-password")
        .exec((error, user: any) => {
          if (error) return res.status(400).json({ message: error });
          if (!user)
            return res.status(404).json({ message: "User Not found." });
          return res.status(200).json({ data: user.toObject().address });
        });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  deleteAddress: async (req: UserRequest, res: Response) => {
    const { userId } = res.locals;
    const requestAddress = req.body.data;

    try {
      UserModel.findByIdAndUpdate(new ObjectId(userId), {
        $pull: { address: { _id: requestAddress } },
      })
        .select("-password")
        .exec((error, user) => {
          if (error) return res.status(400).json({ message: error });
          if (!user)
            return res.status(404).json({ message: "User Not found." });
          return res.status(200).json({ message: "Address has been deleted!" });
        });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};
