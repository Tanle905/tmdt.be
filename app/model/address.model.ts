import mongoose, { Schema } from "mongoose";
import { Address } from "../interface/address.interface";

export const addressDataSchema: Schema = new mongoose.Schema<Address>({
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
});
