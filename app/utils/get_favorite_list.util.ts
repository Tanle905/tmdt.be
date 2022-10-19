import { FavoriteModel } from "../model/favorite.model";

export async function getFavoriteList(
  userId: string,
  productsList: any[],
  convertToObject: boolean = false
) {
  const currentFavoriteList = await FavoriteModel.findOne({ userId });
  if (!currentFavoriteList) return null;
  return productsList.map((product: any) => {
    if (currentFavoriteList.productsList.includes(product._id))
      return {
        ...(convertToObject ? product.toObject() : product),
        isFavorite: true,
      };
    else return product;
  });
}
