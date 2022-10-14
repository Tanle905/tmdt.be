import { Response } from "express";
import { FavoriteRequest } from "../interface/favorite.interface";
import { FavoriteModel } from "../model/favorite.model";
import { ProductModel } from "../model/product.model";

export const favoriteController = {
  get: async (req: FavoriteRequest, res: Response) => {
    const { userId } = res.locals;
    try {
      const document = await FavoriteModel.findOne({ userId });
      const mappedProductsList = document
      ? await Promise.all(
          document.productsList.map(async (item: any) => {
            const product = await ProductModel.findOne({
              _id: item,
            });
            return {
              ...product?.toObject(),
            };
          })
        )
      : [];
    return res.json({ data: mappedProductsList });    } catch (error) {
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
          const existedProductInFavorite =
            currentFavoriteList.productsList.filter(
              (item: String) => item === requestFavorite
            )[0];
          if (existedProductInFavorite) {
            await FavoriteModel.findOneAndUpdate(
              {
                _id: currentFavoriteList._id,
                productsList: existedProductInFavorite,
              },
              {
                $pullAll: {
                  productsList: [existedProductInFavorite],
                },
              }
            );
            return res.json({
              message: "Product has been removed from favorite!",
            });
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
