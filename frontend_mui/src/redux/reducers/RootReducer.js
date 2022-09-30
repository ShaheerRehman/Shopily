import { combineReducers } from "@reduxjs/toolkit";
import productList from "./ducks/ProductListDuck";
import product from "./ducks/ProductDuck";
import CartAddItem from "./ducks/CartAddItemDuck";

const reducers = {
  productList,
  product,
  CartAddItem,
};

export default combineReducers(reducers);
