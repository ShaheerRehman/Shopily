import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  loading: false,
  products: [],
  error: "",
};

const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const res = await axios.get("/api/products/");
  return res.data;
});

const productListSlice = createSlice({
  name: "productList",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.products = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error =
        action.error.response && action.error.response.data.message
          ? action.error.response.data.message
          : action.error.message;
    });
  },
});

export { fetchProducts };
export default productListSlice.reducer;
