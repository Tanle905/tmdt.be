import { Request, Response } from "express";
import { BannerModel } from "../model/banner.model";

export const bannerController = {
  get: async (req: Request, res: Response) => {
    BannerModel.find({}).exec((error, banner) => {
      if (error)
        return res
          .status(500)
          .json({ message: "There was an error getting banners!" });
      return res.status(200).json({ data: banner });
    });
  },
  post: async (req: Request, res: Response) => {
    const { imageUrl, linkTo } = req.body;
    try {
      const document = new BannerModel({ imageUrl, linkTo });
      await document.save();
      
      return res.status(200).json({ data: document.toObject });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};
