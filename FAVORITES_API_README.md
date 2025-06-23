# Favorites API Implementation

This document describes the implementation of the favorites functionality for the Taily app, following the existing codebase patterns and matching the backend API structure.

## Overview

The favorites system allows users to:
- Add food items to their favorites
- Remove food items from their favorites
- View all their favorite food items
- See real-time favorite status across the app

## Backend API Endpoints

The implementation matches these backend endpoints:

### 1. Get All Favorites
```
GET /api/favorites
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "favorites": [
    {
      "_id": "favorite_id",
      "user": "user_id",
      "food": "food_id",
      "foodDetails": {
        "_id": "food_id",
        "name": "Food Name",
        "image": "food_image.jpg",
        "price": 15.99,
        "description": "Food description",
        "category": {
          "_id": "category_id",
          "name": "Category Name"
        }
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Add to Favorites
```
POST /api/favorites
Authorization: Bearer <token>
Content-Type: application/json

{
  "foodId": "food_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Food added to favorites successfully"
}
```

### 3. Remove from Favorites
```
DELETE /api/favorites/:foodId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Food removed from favorites successfully"
}
```

## Frontend Implementation

### Redux Structure

The favorites functionality follows the existing Redux pattern with separate files:

#### 1. Actions (`Redux/Reducers/Favorites/action.ts`)
```typescript
// Action types
export const SET_FAVORITES = 'SET_FAVORITES';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const SET_FAVORITES_LOADING = 'SET_FAVORITES_LOADING';

// Action creators
export const setFavorites = (favorites: FavoriteProduct[]) => { /* ... */ };
export const addToFavorites = (favorite: FavoriteProduct) => { /* ... */ };
export const removeFromFavorites = (foodId: string) => { /* ... */ };
export const setFavoritesLoading = (loading: boolean) => { /* ... */ };

// API actions
export const GET_ALL_FAVORITES = (callback: TCallback<{success: boolean; favorites: FavoriteProduct[]}>) => { /* ... */ };
export const ADD_PRODUCT_TO_FAVORITES = (foodId: string, callback: TCallback<ICommonResponse>) => { /* ... */ };
export const REMOVE_PRODUCT_FROM_FAVORITES = (foodId: string, callback: TCallback<ICommonResponse>) => { /* ... */ };
```

#### 2. Types (`Redux/Reducers/Favorites/actions.d.ts`)
```typescript
export interface FavoriteProduct {
  _id: string;
  user: string;
  food: string;
  foodDetails: {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    category: {
      _id: string;
      name: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface TFavoritesState {
  favorites: FavoriteProduct[];
  loading: boolean;
}
```

#### 3. Reducer (`Redux/Reducers/Favorites/reducer.ts`)
```typescript
const initialState: TFavoritesState = {
  favorites: [],
  loading: false,
};

const favoritesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FAVORITES:
      return { ...state, favorites: action.payload };
    case ADD_TO_FAVORITES:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FROM_FAVORITES:
      return { 
        ...state, 
        favorites: state.favorites.filter(fav => fav.food !== action.payload) 
      };
    case SET_FAVORITES_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
```

### API Configuration (`config/API.ts`)
```typescript
export const API = {
  // ... existing endpoints
  GET_ALL_FAVORITES: {
    method: 'GET',
    url: '/favorites',
  },
  ADD_TO_FAVORITES: {
    method: 'POST',
    url: '/favorites',
  },
  REMOVE_FROM_FAVORITES: {
    method: 'DELETE',
    url: '/favorites/',
  },
};
```

### Component Usage

#### 1. Food Cards (VerticalFoodCard, HorizontalFoodCard)
```typescript
import {useAppSelector} from '../Helper/Hooks/reduxHooks';
import {
  ADD_PRODUCT_TO_FAVORITES,
  REMOVE_PRODUCT_FROM_FAVORITES,
} from '../Redux/Reducers/Favorites/action';

const VerticalFoodCard = ({foodId, ...props}) => {
  const {favorites} = useAppSelector(state => state.favorites);
  
  const isFavorite = favorites.some(fav => fav.food._id === foodId);

  const handleFavoritePress = () => {
    if (isFavorite) {
      REMOVE_PRODUCT_FROM_FAVORITES(foodId, () => {});
    } else {
      ADD_PRODUCT_TO_FAVORITES(foodId, () => {});
    }
  };

  return (
    <TouchableOpacity onPress={handleFavoritePress}>
      <Image
        source={isFavorite ? icons.heart2 : icons.heart2Outline}
        style={styles.heartIcon}
      />
    </TouchableOpacity>
  );
};
```

#### 2. Favorites Screen
```typescript
import {useAppSelector} from '../Helper/Hooks/reduxHooks';
import {GET_ALL_FAVORITES, REMOVE_PRODUCT_FROM_FAVORITES} from '../Redux/Reducers/Favorites/action';

const Favourite = () => {
  const {favorites, loading} = useAppSelector(state => state.favorites);

  useEffect(() => {
    GET_ALL_FAVORITES(() => {});
  }, []);

  const handleRemoveBookmark = () => {
    if (selectedBookmarkItem) {
      REMOVE_PRODUCT_FROM_FAVORITES(selectedBookmarkItem.food, response => {
        if (response.success) {
          refRBSheet.current.close();
        }
      });
    }
  };

  // Convert favorites to Food format for compatibility
  const myBookmarkFoods: Food[] = favorites.map((favorite: FavoriteProduct) => {
    const foodDetails = (favorite.foodDetails as any) || {};
    return {
      id: favorite.food,
      name: foodDetails.name || 'Unknown Food',
      image: typeof foodDetails.image === 'string' 
        ? {uri: foodDetails.image} 
        : foodDetails.image,
      // ... other properties
    };
  });

  return (
    // Render favorites list
  );
};
```

#### 3. Food Details Screen
```typescript
const FoodDetailsAddItem = () => {
  const {favorites} = useAppSelector(state => state.favorites);
  const {foodId} = route.params;

  const isFavorite = favorites.some(fav => fav.food._id === foodId);

  const handleFavoritePress = () => {
    if (isFavorite) {
      REMOVE_PRODUCT_FROM_FAVORITES(foodId, () => {});
    } else {
      ADD_PRODUCT_TO_FAVORITES(foodId, () => {});
    }
  };

  return (
    <TouchableOpacity onPress={handleFavoritePress}>
      <Image
        source={isFavorite ? icons.heart2 : icons.heart2Outline}
        style={styles.heartIcon}
      />
    </TouchableOpacity>
  );
};
```

## Key Features

### 1. Real-time State Management
- Favorites state is managed in Redux store
- All components automatically update when favorites change
- No need for manual state synchronization

### 2. Optimistic Updates
- UI updates immediately when user toggles favorite
- API calls happen in background
- Error handling reverts changes if API fails

### 3. Consistent API Pattern
- Follows existing codebase patterns
- Uses direct Redux actions instead of custom hooks
- Consistent error handling and loading states

### 4. Type Safety
- Full TypeScript support
- Proper type definitions for all data structures
- Compile-time error checking

## Error Handling

The implementation includes comprehensive error handling:

```typescript
.catch(error => {
  console.log('📢 [API_ACTION]', error);
  showSnackbar({
    type: 'error',
    body: getError(error),
    header: 'Error',
  });
  callback({success: false, message: error.message});
});
```

## Loading States

Loading states are managed through Redux:

```typescript
export const setFavoritesLoading = (loading: boolean) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_FAVORITES_LOADING, payload: loading});
};
```

## Best Practices

1. **Consistent API Calls**: All API calls follow the same pattern with callbacks
2. **Redux Integration**: Uses existing Redux infrastructure
3. **Type Safety**: Full TypeScript support throughout
4. **Error Handling**: Comprehensive error handling with user feedback
5. **Performance**: Optimistic updates for better UX
6. **Code Reusability**: Components can be easily reused across the app

## Integration Points

- **Authentication**: Requires valid user token
- **Navigation**: Integrates with existing navigation system
- **Theme**: Supports dark/light theme switching
- **Localization**: Ready for internationalization
- **Analytics**: Can be easily extended with analytics tracking

This implementation provides a robust, scalable, and maintainable favorites system that integrates seamlessly with the existing Taily app architecture. 