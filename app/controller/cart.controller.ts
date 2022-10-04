import { Response } from "express";
import { ObjectId } from "mongodb";
import { CartRequest } from "../interface/cart.interface";
import { CartModel } from "../model/cart.model";
import { ProductModel } from "../model/product.model";

export const cartController = {
  getById: async (req: CartRequest, res: Response) => {
    const { userId } = res.locals;
    try {
      if (userId) {
        const document = await CartModel.find({ userId });
        const mappedProductsList = document[0]
          ? await Promise.all(
              document[0].productsList.map(async (item) => {
                return {
                  product: await ProductModel.findOne({
                    productId: item.productId,
                  }),
                  quantity: item.quantity,
                };
              })
            )
          : [];
        return res.json({ data: mappedProductsList });
      }
    } catch (error) {
      return res.json({ message: error });
    }
  },
  postById: async (req: CartRequest, res: Response) => {
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
            await CartModel.findOneAndUpdate(
              {
                _id: currentCart._id,
                "productsList.productId": existedProductInCart.productId,
              },
              {
                $set: {
                  "productsList.$.quantity":
                    existedProductInCart.quantity + requestProduct.quantity,
                },
              }
            );
          } else {
            currentCart.productsList.push(requestProduct);
          }
          await currentCart.save();
        } else {
          const newCart = new CartModel({ userId });
          newCart.productsList.push(requestProduct);
          await newCart.save();
        }
        return res.json({ message: "Product has been added to cart!" });
      }
    } catch (error) {
      return res.json({ message: error });
    }
  },
};