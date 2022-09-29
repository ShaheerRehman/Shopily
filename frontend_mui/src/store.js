import { configureStore } from "@reduxjs/toolkit";

import RootReducer from "./redux/reducers/RootReducer";

const store = configureStore({ reducer: RootReducer });
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

export default store;
