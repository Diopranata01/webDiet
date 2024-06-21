// store.js
import { configureStore } from "@reduxjs/toolkit";
import foodMaterialReducer from "./slices/foodMaterialSlice";

export const store = configureStore({
  reducer: {
    foodMaterial: foodMaterialReducer,
  },
});
