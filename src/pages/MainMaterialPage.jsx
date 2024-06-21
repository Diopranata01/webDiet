import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFoodMaterials,
  setFilteredData,
} from "../redux/slices/foodMaterialSlice";
import { useParams, Link, Outlet } from "react-router-dom";
import { camelCaseToLowerCase, capitalizeEachWord } from "../services/TextConvert";

const MainMaterialPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [dataBaru, setData] = useState([]);
  const { data, generalFoodData, filteredData, loading } = useSelector((state) => state.foodMaterial);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(generalFoodData);
    const dataCamelCase = generalFoodData.map( item => {return camelCaseToLowerCase(item)})
    const dataCapitalize = dataCamelCase.map( item => {return capitalizeEachWord(item)})

    setData(dataCapitalize);
    // dispatch(fetchFoodMaterials(dataCapitalize));

  }, [generalFoodData]);

  return (
    <div>{dataBaru.map((item, index )=> <div key={index}>{item}</div>)}</div>
  )
}

export default MainMaterialPage