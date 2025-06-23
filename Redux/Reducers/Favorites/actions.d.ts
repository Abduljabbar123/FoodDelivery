export interface FavoriteProduct {
  _id: string;
  user: string;
  food: string;
  createdAt: string;
  updatedAt: string;
  // Populated food object from backend
  foodDetails?: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    image: string;
    category?: {
      _id: string;
      name: string;
    };
    distance?: string;
    rating?: number;
    numReviews?: number;
    isPromo?: boolean;
    fee?: string;
  };
}

export interface TFavoritesState {
  favorites: FavoriteProduct[];
  loading: boolean;
  error: string | null;
}

export interface AddToFavoriteRequest {
  foodId: string;
}

export interface RemoveFromFavoriteRequest {
  foodId: string;
}

export interface CheckFavoriteStatusRequest {
  foodId: string;
}
