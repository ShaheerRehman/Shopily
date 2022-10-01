import { combineReducers } from "@reduxjs/toolkit";
import productList from "./ducks/ProductListDuck";
import product from "./ducks/ProductDuck";
import Cart from "./ducks/CartDuck";

const reducers = {
  productList,
  product,
  Cart,
};

export default combineReducers(reducers);
