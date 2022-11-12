import mongoose, { Schema } from "mongoose";

const bannerDataSchema: Schema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  linkTo: {
    type: String,
  },
});

export const BannerModel = mongoose.model("Banner", bannerDataSchema);
