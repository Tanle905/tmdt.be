import { Response } from "express";
import { ObjectId } from "mongodb";
import { CartRequest } from "../interface/cart.interface";
import { CartModel } from "../model/cart.model";
import { ProductModel } from "../model/product.model";
import { getFavoriteList } from "../utils/get_favorite_list.util";

export const cartController = {
  get: async (req: CartRequest, res: Response) => {
    const { userId } = res.locals;
    try {
      if (userId) {
        const document = await CartModel.find({ userId });
        const mappedProductsList = document[0]
          ? await Promise.all(
              document[0].productsList.map(async (item) => {
                const product = await ProductModel.findOne({
                  _id: item.productId,
                });
                return {
                  ...product?.toObject(),
                  quantity: item.quantity,
                };
              })
            )
          : [];
        const favoriteProductsList = await getFavoriteList(
          userId,
          mappedProductsList
        );

        return res.json({
          data: favoriteProductsList || mappedProductsList,
        });
      }
    } catch (error) {
      return res.json({ message: error });
    }
  },
  post: async (req: CartRequest, res: Response) => {
    const { userId } = res.locals;
    const requestProduct = req.body.data[0];
    try {
      if (userId) {
        const currentCart = await CartModel.findOne({ userId });
        if (currentCart) {
          const existedProductInCart = currentCart.productsList.filter(
            (item) => item.productId === requestProduct.productId
          )[0];
          if (existedProductInCart) {
            CartModel.findOneAndUpdate(
              {
                _id: currentCart._id,
                "productsList.productId": existedProductInCart.productId,
              },
              {
                $set: {
                  "productsList.$.quantity":
                    existedProductInCart.quantity + requestProduct.quantity,
                },
              },
              {
                returnDocument: "after",
              }
            ).exec(async (error, currentCart) => {
              await currentCart?.save();
              res.json({ message: "Product has been added to cart!" });
            });
          } else {
            currentCart.productsList.push(requestProduct);
            await currentCart.save();
            return res.json({ message: "Product has been added to cart!" });
          }
        } else {
          const newCart = new CartModel({ userId });
          newCart.productsList.push(requestProduct);
          await newCart.save();
          return res.json({ message: "Product has been added to cart!" });
        }
      }
    } catch (error) {
      return res.json({ message: error });
    }
  },
  updateItemInCart: async (req: CartRequest, res: Response) => {
    const { userId } = res.locals;
    const requestProduct = req.body.data[0];
    try {
      if (userId) {
        const currentCart = await CartModel.findOne({ userId });
        if (currentCart) {
          const existedProductInCart = currentCart.productsList.filter(
            (item) => item.productId === requestProduct.productId
          )[0];
          if (existedProductInCart) {
            CartModel.findOneAndUpdate(
              {
                _id: currentCart._id,
                "productsList.productId": existedProductInCart.productId,
              },
              {
                $set: {
                  "productsList.$": {
                    productId: requestProduct.productId,
                    quantity: requestProduct.quantity,
                  },
                },
              }
            ).exec(async (error, currentCart) => {
              await currentCart?.save();
              res.json({ message: "Product has updated to cart!" });
            });
          } else
            return res.json({ message: "Product does not exist in cart!" });
        } else return res.json({ message: "Cart does not exist!" });
      }
    } catch (error) {
      return res.json({ message: error });
    }
  },
  deleteProductInCart: async (req: CartRequest, res: Response) => {
    const { userId } = res.locals;
    const requestProduct = req.body.data[0];
    try {
      if (userId) {
        const currentCart = await CartModel.findOne({ userId });
        if (currentCart) {
          const existedProductInCart = currentCart.productsList.filter(
            (item) => item.productId === requestProduct.productId
          )[0];
          if (existedProductInCart) {
            CartModel.findOneAndUpdate(
              {
                _id: currentCart._id,
                "productsList.productId": existedProductInCart.productId,
              },
              {
                $pull: {
                  productsList: { productId: [existedProductInCart.productId] },
                },
              }
            ).exec(async (error, currentCart) => {
              await currentCart?.save();
              res.json({ message: "Product has been deleted from cart!" });
            });
          } else
            return res.json({ message: "Product does not exist in cart!" });
        } else return res.json({ message: "Cart does not exist!" });
      }
    } catch (error) {
      return res.json({ message: error });
    }
  },
  deleteById: async (req: CartRequest, res: Response) => {
    const { userId } = req.params;
    try {
      if (userId) {
        const currentCart = await CartModel.findOneAndDelete({ userId });
        if (!currentCart)
          return res.status(400).json({ message: "Cart does not exist!" });
        return res.status(200).json({ message: "Cart remove completed!" });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};
