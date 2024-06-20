import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/layout/Layout";

export const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/calculate-diet" element={<div>Diet</div>} />
        {/* <Route path="/" element={<Navigate to="/" />}>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};
