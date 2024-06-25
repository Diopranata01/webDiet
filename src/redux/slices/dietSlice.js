// slices/foodMaterialSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graph, parse, SPARQLToQuery } from "rdflib";
import { camelCaseToLowerCase, capitalizeEachWord } from "../../services/TextConvert";
import { queries } from "../../services/querryRDF";

export const fetchDietMaterials = createAsyncThunk(
    "dietMaterial/fetchDietMaterials",
    async (slug) => {
      const response = await fetch("/makanandiet2aplikasi.rdf");
      const rdfText = await response.text();
      const store = graph();
      const mimeType = "application/rdf+xml";
      const baseURI = import.meta.env.VITE_APP_BASE_URL;
  
      parse(rdfText, store, baseURI, mimeType);

      console.log(slug);
  
      const query = 
        slug === 'dietDash' ? queries.dietDash : 
        slug === 'dietIntermittentFasting' ? queries.dietIntermitten : 
        slug === 'dietKatogenik' ? queries.dietKatogenik : 
        slug === 'dietLowCarb' ? queries.dietLowCarb : 
        slug === 'dietMediterania' ? queries.dietMediterania : queries.dietVegan 
  
      const sparqlQuery = SPARQLToQuery(query, false, store);
      const results = [];
  
      // Use a Promise to handle the asynchronous query
      const queryPromise = new Promise((resolve, reject) => {
        store.query(sparqlQuery, (result) => {
          let data = result["?makanan"].value;
          let newData = data.replace(
            "http://www.semanticweb.org/danny/2024/5/makanan_diet#",
            ""
          );
          results.push({ makanan: newData });
          resolve(results); // Resolve the promise with the results
        });
      });
  
      // Await the query promise to get the results
      const fetchedResults = await queryPromise;
      // console.log(fetchedResults); // Log the results
      return fetchedResults; // Return the results to the reducer
    }
);
  
const dietMenuSlice = createSlice({
    name: "dietMaterial",
    initialState: {
      data: [],
      generalFoodData: [
        'dietDash', 'dietIntermittentFasting', 
        'dietKatogenik', 'dietLowCarb', 'dietMediterania', 
        'vegan'],
      filteredData: [],
      loading: false,
      error: null,
    },
    reducers: {
      setFilteredData: (state, action) => {
        state.filteredData = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchDietMaterials.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchDietMaterials.fulfilled, (state, action) => {
          state.data = action.payload;
          state.filteredData = action.payload;
          state.loading = false;
        })
        .addCase(fetchDietMaterials.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
});

export const { setFilteredData } = dietMenuSlice.actions;
export default dietMenuSlice.reducer;