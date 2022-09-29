import { combineReducers } from "@reduxjs/toolkit";
import productList from "./ducks/ProductListDuck";
import product from "./ducks/ProductDuck";

const reducers = {
  productList,
  product,
};

export default combineReducers(reducers);
