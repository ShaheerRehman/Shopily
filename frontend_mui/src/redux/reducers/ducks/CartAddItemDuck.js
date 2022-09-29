import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartAddItemSlice = createSlice({
  name: "cartAddItem",
  initialState: INITIAL_STATE,
  reducers: {
    CART_ADD_ITEM(state, action) {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
      }
    },
  },
});
