import mongoose from "mongoose";
import { User } from "../interface/user_and_roles.interface";

export const userDataSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    // statics: {
    //   extractProductData(payload: any) {
    //     Object.keys(payload).forEach(
    //       (key: string) => payload[key] === undefined && delete payload[key]
    //     );

    //     return payload;
    //   },
    // },
  }
);

export const UserModel = mongoose.model<User>("User", userDataSchema);
