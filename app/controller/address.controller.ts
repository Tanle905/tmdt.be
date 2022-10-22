import { Response } from "express";
import { ObjectId } from "mongodb";
import { UserRequest } from "../interface/user_and_roles.interface";
import { UserModel } from "../model/user.model";

export const addressController = {
  get: async (req: UserRequest, res: Response) => {
    const { userId } = res.locals;

    try {
      UserModel.findById(new ObjectId(userId)).exec((error, user: any) => {
        if (error) return res.status(400).json({ message: error });
        if (!user)
          return res.status(404).json({ message: "Address Not found!" });
        return res.status(200).json({ data: user.toObject().address });
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  put: async (req: UserRequest, res: Response) => {
    const { userId } = res.locals;
    const { id } = req.params;
    const requestAddress = req.body.data;

    try {
      UserModel.findOneAndUpdate(
        {
          _id: new ObjectId(userId),
          address: new ObjectId(id),
        },
        {
          $set: {
            "address.$.address": requestAddress.address,
            "address.$.city": requestAddress.city,
            "address.$.country": requestAddress.country,
            "address.$.fullName": requestAddress.fullName,
            "address.$.phoneNumber": requestAddress.phoneNumber,
          },
        },
        { upsert: true, returnDocument: "after" }
      ).exec(async (error, user) => {
        console.log(error, user);
        if (error) return res.status(400).json({ message: error });
        if (!user)
          return res.status(404).json({ message: "Address Not found!" });
        return res.status(200).json({ message: "Address has been updated!" });
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  delete: async (req: UserRequest, res: Response) => {
    const { userId } = res.locals;
    const { id } = req.params;

    try {
      UserModel.findByIdAndUpdate(new ObjectId(userId), {
        $pull: { address: { _id: id } },
      }).exec((error, user) => {
        if (error) return res.status(400).json({ message: error });
        if (!user)
          return res.status(404).json({ message: "Address Not found!" });
        return res.status(200).json({ message: "Address has been deleted!" });
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};
