export interface Favorite {
  userId: string;
  productsList: FavoriteDetails[];
}

export interface FavoriteRequest {
  body: { data: String[] };
}

export interface FavoriteDetails {
  productId: string;
}
