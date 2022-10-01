import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const INITIAL_STATE = { cartItems: cartItemsFromStorage };

const fetchItemToAdd = createAsyncThunk(
  "fetchProduct",
  async (idQty, thunkAPI) => {
    const { data } = await axios.get(`/api/product/${idQty.id}`);
    thunkAPI.dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: idQty.qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(thunkAPI.getState().Cart.cartItems)
    );
  }
);

const removeFromCart = createAsyncThunk("removeProduct", (id, thunkAPI) => {
  thunkAPI.dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(thunkAPI.getState().Cart.cartItems)
  );
});

const CartSlice = createSlice({
  name: "addToCart",
  initialState: INITIAL_STATE,
  reducers: {
    CART_ADD_ITEM(state, { payload }) {
      const item = payload;
      const existItem = _.cloneDeep(state.cartItems).find(
        (x) => x.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: _.cloneDeep(state.cartItems).map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        state.cartItems = [...state.cartItems, item];
        localStorage.setItem("cartItems", state.cartItems);
      }
    },
    CART_REMOVE_ITEM(state, { payload }) {
      return {
        ...state,
        cartItems: _.cloneDeep(state.cartItems).filter(
          (i) => i.product !== payload
        ),
      };
    },
  },
});

export const { CART_ADD_ITEM, CART_REMOVE_ITEM } = CartSlice.actions;
export { fetchItemToAdd, removeFromCart };
export default CartSlice.reducer;
