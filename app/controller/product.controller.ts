import { Response } from "express";
import { ObjectId } from "mongodb";
import { ProductRequest } from "../interface/product.interface";
import { ProductModel } from "../model/product.model";

export const productController = {
  get: async (req: ProductRequest, res: Response) => {
    const { isFavorite, page, pageSize, title, sortBy, isAsc } = req.query;
    const productPage = page || 1;
    const productPageSize = pageSize || 10;
    const sortOrder = isAsc !== undefined ? (isAsc ? 1 : -1) : 1;
    try {
      const data = await ProductModel.find(
        title
          ? {
              $text: {
                $search: title,
                $caseSensitive: false,
              },
            }
          : isFavorite !== undefined
          ? { isFavorite }
          : {}
      )
        .sort(
          sortBy
            ? [[sortBy, sortOrder]]
            : { updatedAt: sortOrder }
        )
        .skip((productPage - 1) * productPageSize)
        .limit(productPageSize);
      const count = data.length;
      return res
        .status(200)
        .json({ count, page: productPage, pageSize: productPageSize, data });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  getById: async (req: ProductRequest, res: Response) => {
    try {
      const { id } = req.params;
      const data = await ProductModel.findById(id);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
  post: async (req: ProductRequest, res: Response) => {
    const { title, description, price, imageUrl, isFavorite } = req.body;
    const productData = new ProductModel({
      title,
      description,
      price,
      imageUrl,
      isFavorite: isFavorite || false,
    });
    try {
      ProductModel.createIndexes();
      const dataToSave = await productData.save();
      return res.status(200).json(dataToSave);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
  put: async (req: ProductRequest, res: Response) => {
    try {
      const productData = ProductModel.extractProductData(req.body);
      const dataToUpdate = await ProductModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: productData,
        },
        { returnDocument: "after" }
      );
      return res.status(200).json(dataToUpdate);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  delete: async (req: ProductRequest, res: Response) => {
    const { idArray } = req.body;
    try {
      if (!idArray)
        return res.status(500).json({ message: "Please provide product Id!" });
      console.log(idArray);
      let count = 0;

      for (let index = 0; index < idArray.length; index++) {
        try {
          await ProductModel.findByIdAndDelete(idArray[index]);
          count++;
        } catch (error) {
          return res.status(500).json({ message: "Error deleting product!" });
        }
      }
      return res
        .status(200)
        .json({ message: `${count} items has been deleted` });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteById: async (req: ProductRequest, res: Response) => {
    try {
      const { id } = req.params;
      await ProductModel.findByIdAndDelete(id);
      return res.status(200).json({ message: `item ${id} has been deleted` });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};
