import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  loading: false,
  product: [],
  error: "",
};

const fetchProduct = createAsyncThunk("CART_ADD_ITEM", async (id) => {
  const res = await axios.get(`/api/product/${id}`);
  return res.data;
});

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, { payload }) => {
      state.product = payload._id;
      state.name = payload.name;
      state.image = payload.image;
      state.price = payload.price;
      state.countInStock = payload.countInStock;
      state.qty = payload.qty;
    });
  },
});

export { fetchProduct };
export default productSlice.reducer;
