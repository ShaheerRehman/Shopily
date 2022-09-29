import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  loading: false,
  product: [],
  error: "",
};

const fetchProduct = createAsyncThunk("fetchProduct", async (id) => {
  const res = await axios.get(`/api/product/${id}`);
  return res.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
      state.product = [];
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.product = [];
      state.error =
        action.error.response && action.error.response.data.message
          ? action.error.response.data.message
          : action.error.message;
    });
  },
});

export { fetchProduct };
export default productSlice.reducer;
