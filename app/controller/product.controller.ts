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
            ? { sortBy: sortOrder, _id: sortOrder }
            : { updatedAt: sortOrder }
        )
        .skip((productPage - 1) * productPageSize)
        .limit(productPageSize);
      const count = data.length;
      res
        .status(200)
        .json({ count, page: productPage, pageSize: productPageSize, data });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
  getById: async (req: ProductRequest, res: Response) => {
    try {
      const { id } = req.params;
      const data = await ProductModel.findById(id);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
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
      res.status(200).json(dataToSave);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
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
      res.status(200).json(dataToUpdate);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  delete: async (req: ProductRequest, res: Response) => {
    try {
      const { idArray } = req.query;
      if (idArray) {
        const parsedIdArray: string[] = JSON.parse(idArray);
        const objectIds = parsedIdArray.map((id: any) => new ObjectId(id));
        const count = await ProductModel.deleteMany({
          _id: { $in: objectIds },
        });
        res.status(200).send(`${count} items has been deleted`);
      } else {
        await ProductModel.deleteMany({});
        res.status(200).send("All items has been removed");
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteById: async (req: ProductRequest, res: Response) => {
    try {
      const { id } = req.params;
      await ProductModel.findByIdAndDelete(id);
      res.status(200).send(`item ${id} has been deleted`);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
