import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import fishSvg from "../assets/svg/fishSvg.svg";
import soupSvg from "../assets/svg/soupSvg.svg";
import fruitSvg from "../assets/svg/fruitSvg.svg";
import snackSvg from "../assets/svg/snackSvg.svg";
import meatSvg from "../assets/svg/meatSvg.svg";
import {
  camelCaseToLowerCase,
  capitalizeEachWord,
} from "../services/TextConvert";

const DietListPage = () => {
  const { filteredData, loading } = useSelector((state) => state.dietMaterial);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { slug } = useParams();

  const upperCaseData = filteredData.map((item) => {
    const lowerCaseStr = camelCaseToLowerCase(item.makanan);
    const capitalizedStr = capitalizeEachWord(lowerCaseStr);

    return { makanan: capitalizedStr, name: item.makanan };
  })

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = upperCaseData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-14">
        {/* Display Food Materials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : currentItems.length === 0 ? (
            <p>No results found.</p>
          ) : (
            currentItems.map((item, index) => (
              <Link
                to={`/diet-programs/${slug}/detail/${item.name}`}
                key={index}
                className="flex items-start bg-white rounded-lg shadow-md p-4"
              >
              <img
                src={item.makanan.includes("Buah") ? fruitSvg : 
                    item.makanan.includes("Ayam") && !item.makanan.includes("Soto") ? meatSvg : 
                    item.makanan.includes("Ikan") ? fishSvg : 
                    item.makanan.includes("Sayur") || item.makanan.includes("Soto") ? soupSvg : 
                    snackSvg 
                  }
                alt="svg"
                width="45"
                height="45"
                className="bg-old-gold rounded-[10px] mr-4 p-2"
              />
                <div className="flex flex-col items-start text-left">
                  <h2 className="text-lg font-bold">{item.makanan}</h2>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vitae praesentium dolorum perferendis consectetur aliquam at
                    et est debitis iusto sit. Explicabo voluptates quia tenetur
                    cumque nobis id odit nemo rem?
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 mb-8">
          <ul className="flex gap-3">
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`px-3 py-[6px] pt-[4px] rounded-md border border-gray-400 ${
                  currentPage === number
                    ? "bg-old-gold text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DietListPage;
