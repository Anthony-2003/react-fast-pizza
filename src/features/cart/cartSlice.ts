// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../../types/MenuItem";

type cartState = {
  cart: Cart[];
};

const initialState: cartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Cart>) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }

      if (item?.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

type TypeState = {
  cart: {
    cart: Cart[];
  };
};

export const getCart = (state: TypeState) => state.cart.cart;

export const getTotalCartQuantity = (state: TypeState) =>
  state.cart.cart.reduce((sum: number, item: Cart) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: TypeState) =>
  state.cart.cart.reduce((sum: number, item: Cart) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id: number) => (state: TypeState) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
