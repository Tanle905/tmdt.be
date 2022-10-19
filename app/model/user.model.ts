import mongoose, { Schema } from "mongoose";
import { Address } from "../interface/address.interface";
import {
  User,
  UserModelInterface,
} from "../interface/user_and_roles.interface";

const addressDataSchema: Schema = new mongoose.Schema<Address>(
  {
    address: {
      required: true,
      type: String,
    },
    city: {
      required: true,
      type: String,
    },
    country: {
      required: true,
      type: String,
    },
    fullName: {
      required: true,
      type: String,
    },
    phoneNumber: {
      required: true,
      type: Number,
    },
  },
);

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
