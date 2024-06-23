import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import HomePage from "../pages/HomePage";
import FoodMaterialPage from "../pages/FoodMaterialPage";
import FromAnimalPage from "../pages/FoodListPage";
import MainMaterialPage from "../pages/MainMaterialPage";
import MenuMaterialPage from "../pages/MenuMaterialPage";
import MainMenuMaterialPage from "../pages/MainMenuMaterialPage";

export const RouteConfig = () => {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/about" element={<div>About</div>} />
            <Route path="/calculate-diet" element={<div>Diet</div>} />
            <Route path="/healthy-recipes" element={<MenuMaterialPage />}>
              <Route index element={<MainMenuMaterialPage />} />
              {/* <Route path=":slug" element={<FoodMaterialPage />} /> */}
            </Route>
            <Route path="/food-material" element={<FoodMaterialPage />}>
              <Route index element={<MainMaterialPage />} />
              <Route path=":slug" element={<FromAnimalPage />}/>
            </Route>
          </Route>
      </Routes>
  );
};
