import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);
      const quantityToAdd = newItem.quantity || 1;
      
      if (!existingItem) {
        state.cartItems.push({
          ...newItem,
          quantity: quantityToAdd,
          totalPrice: Number(newItem.price) * quantityToAdd,
        });
      } else {
        existingItem.quantity += quantityToAdd;
        existingItem.totalPrice = Number(existingItem.totalPrice) + (Number(newItem.price) * quantityToAdd);
      }
      
      state.totalQuantity += quantityToAdd;
      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.cartItems = state.cartItems.filter(item => item.id !== id);
        state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
