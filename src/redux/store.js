// store.js
import { configureStore } from "@reduxjs/toolkit";
import foodMaterialReducer from "./slices/foodMaterialSlice";
import menuSlice from "./slices/menuSlice";

export const store = configureStore({
  reducer: {
    foodMaterial: foodMaterialReducer,
    menuMaterial: menuSlice,
  },
});
