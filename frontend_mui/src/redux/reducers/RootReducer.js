import { combineReducers } from "@reduxjs/toolkit";
import productList from "./ducks/ProductListDuck";
import product from "./ducks/ProductDuck";
import Cart from "./ducks/CartDuck";
import User from "./ducks/UserDuck";

const reducers = {
  productList,
  product,
  Cart,
  User,
};

export default combineReducers(reducers);
