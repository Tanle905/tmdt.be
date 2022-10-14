import { Response } from "express";
import { FavoriteRequest } from "../interface/favorite.interface";
import { FavoriteModel } from "../model/favorite.model";

export const favoriteController = {
  get: async (req: FavoriteRequest, res: Response) => {
    const { userId } = res.locals;
    try {
      const document = await FavoriteModel.findOne({ userId });
      return res.status(200).json({ data: document || [] });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  put: async (req: FavoriteRequest, res: Response) => {
    const { userId } = res.locals;
    const requestFavorite = req.body.data[0];
    try {
      if (userId) {
        const currentFavoriteList = await FavoriteModel.findOne({ userId });
        if (currentFavoriteList) {
          const existedProductInFavorite = currentFavoriteList.productsList.filter(
            (item: String) => item === requestFavorite
          )[0];
          if (existedProductInFavorite) {
            await FavoriteModel.findOneAndUpdate(
              {
                _id: currentFavoriteList._id,
                "productsList": existedProductInFavorite,
              },
              {
                $pullAll: {
                  "productsList": [existedProductInFavorite],
                },
              }
            );
            return res.json({ message: "Product has been removed from favorite!" });
          } else {
            currentFavoriteList.productsList.push(requestFavorite);
          }
          await currentFavoriteList.save();
        } else {
          const newCart = new FavoriteModel({ userId });
          newCart.productsList.push(requestFavorite);
          await newCart.save();
        }
        return res.json({ message: "Product has been added to favorite!" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
