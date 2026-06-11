import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: JSON.parse(localStorage.getItem('wishlist')) || [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const existingItem = state.wishlistItems.find(item => item.id === product.id);
      
      if (existingItem) {
        state.wishlistItems = state.wishlistItems.filter(item => item.id !== product.id);
      } else {
        state.wishlistItems.push(product);
      }
      localStorage.setItem('wishlist', JSON.stringify(state.wishlistItems));
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlistItems));
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      localStorage.removeItem('wishlist');
    }
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
