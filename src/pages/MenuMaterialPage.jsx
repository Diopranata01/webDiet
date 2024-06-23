// FoodMaterialPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenuMaterials,
  setFilteredData,
} from "../redux/slices/menuSlice";
import { useParams, Link, Outlet } from "react-router-dom";

const MenuMaterialPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.foodMaterial);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(slug);
    if (slug !== undefined){
      dispatch(fetchMenuMaterials(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = searchTerm
        ? data.filter((item) =>
            item.makanan.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : data;
      dispatch(setFilteredData(filtered));
    }, 500); // Delay of 500 milliseconds

    return () => clearTimeout(timeoutId); // Clear timeout on cleanup
  }, [searchTerm, data, dispatch]);

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const capitalizeEachWordSlug = (str) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-14">
        <div className="grid grid-cols-1 gap-10">
          {/* Breadcrumbs */}
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-lg font-medium text-black hover:text-gray-900 dark:text-old-gold dark:hover:text-black"
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-7 h-7 text-old-gold pt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Link to="/healthy-recipes" className="ml-1 text-lg font-medium text-black hover:text-gray-900 dark:text-old-gold">
                    Healty Recipies Menu
                  </Link>
                </div>
              </li>
              { slug? (<li>
                <div className="flex items-center">
                  <svg
                    className="w-7 h-7 text-old-gold pt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 text-lg font-medium text-black hover:text-gray-900 dark:text-old-gold">
                    {capitalizeEachWordSlug(slug)}
                  </span>
                </div>
              </li>) : ''}
            </ol>
          </nav>
          {/*Search Input */}
          <input
            type="text"
            name="search"
            id="search"
            value={searchTerm}
            onChange={onChangeSearchTerm}
            placeholder="Search..."
            className="px-4 py-2 border border-old-gold bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default MenuMaterialPage;
