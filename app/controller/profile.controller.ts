import { Response } from "express";
import { ObjectId } from "mongodb";
import { UserRequest } from "../interface/user_and_roles.interface";
import { UserModel } from "../model/user.model";

export const profileController = {
  get: async (req: UserRequest, res: Response) => {
    const { userId } = res.locals;
    try {
      const document = await UserModel.findById(new ObjectId(userId));
      return document
        ? res.status(200).json(document)
        : res.status(404).json({ message: "User not found!" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  put: async (req: UserRequest, res: Response) => {
    const { userId } = res.locals;
    try {
      const profileData = UserModel.extractUserData(req.body);
      UserModel.findByIdAndUpdate(new ObjectId(userId), profileData, {
        upsert: true,
        returnDocument: "after",
      }).exec((error, user) => {
        if (error) return res.status(400).json({ message: error });
        return res.status(200).json(user);
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
