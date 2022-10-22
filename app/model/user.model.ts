import mongoose, { Schema } from "mongoose";
import {
  User,
  UserModelInterface,
} from "../interface/user_and_roles.interface";
import { addressDataSchema } from "./address.model";
import { orderDataSchema } from "./order.model";

export const userDataSchema: Schema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    password: {
      type: String,
      required: true,
    },
    address: [addressDataSchema],
    imageUrl: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    payment: {
      type: String,
    },
    isDeactivated: {
      type: Boolean,
    },
    order: [orderDataSchema],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    statics: {
      extractUserData(payload: any) {
        Object.keys(payload).forEach(
          (key: string) =>
            payload[key] === undefined ||
            (payload[key] === null && delete payload[key])
        );

        return payload;
      },
    },
  }
);

export const UserModel = mongoose.model<User, UserModelInterface>(
  "User",
  userDataSchema
);
