import React, { useEffect, useState } from 'react';
import Banner from "../../components/Banner";
import Navbar from "../../components/Navbar";
import imgDiet from "../../assets/diet-pict-1.webp";
import { graph, parse, SPARQLToQuery } from 'rdflib';
// import imgDiet2 from "../../assets/diet-pict-2.webp";

const Layout = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchRDFFile = async () => {
      try {
        // Fetch the RDF file from the public directory
        const response = await fetch('/danny.rdf');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const rdfText = await response.text();

        // Create a new RDF graph and parse the RDF data
        const store = graph();
        const mimeType = 'application/rdf+xml';
        const baseURI = 'http://www.semanticweb.org/danny/2024/5/makanan_diet#'; // Adjust base URI as needed

        parse(rdfText, store, baseURI, mimeType);

        // Define the SPARQL query
        const query = `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
          PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

          SELECT ?makanan
          WHERE {
            ?makanan rdf:type makanan_diet:darihewan .
          }
        `;

        // Execute the SPARQL query
        const sparqlQuery = SPARQLToQuery(query, false, store);

        const results = [];
        store.query(sparqlQuery, (result) => {

          // remove the uri and take only the data name
          let data = result['?makanan'].value;
          let newData = data.replace('http://www.semanticweb.org/danny/2024/5/makanan_diet#', '')

          results.push({
            makanan: newData,
          });
        });
        setData(results);
      } catch (error) {
        console.error('Error loading RDF file:', error);
      }
    };

    fetchRDFFile();
  }, []);

  return (
    <>
      <Navbar />
      {/* Body */}
      <div className="mx-auto flex flex-col space-y-[4.5rem] max-w-screen-xl w-full px-4 pt-36 text-black">
        {/* Banner */}
        <Banner />
        {/* Content */}
        <div className="grid grid-cols-1 gap-16">
          <div className="max-md:grid-cols-1 grid grid-cols-2 gap-4 h-[22rem]">
            <div className="max-md:row-span-3 rounded-xl d-block relative overflow-hidden">
              <img
                src={imgDiet}
                alt="banner"
                type="image/webp"
                className="object-cover w-full h-[25rem]"
              />
            </div>
            <div className="grid grid-cols-subgrid gap-4 px-7">
              <div className="col-start-2 flex text-start items-center">
                <h1 className="text-3xl">
                  <b>Dive into Our</b>
                  <br />
                  <b>Best Diet Program</b>
                </h1>
              </div>
              {data? (
                <div>
                  {
                    data.map((item, index) => (
                    <div key={index} className="col-start-2 hover:row-span-3 border-black border-b-[1px] px-3 text-start flex items-center">
                      <h1>{item.makanan}</h1>
                    </div>
                    ))
                  }
                </div>
              ) : ''
            }
              {/* <div className="col-start-2 hover:row-span-3 border-black border-b-[1px] px-3 text-start flex items-center">
                <h1>Food Calories Calculation</h1>
              </div>
              <div className="col-start-2 hover:row-span-3 border-black border-b-[1px] px-3 text-start flex items-center">
                <h1>Healty Recipes</h1>
              </div>
              <div className="col-start-2 hover:row-span-3 border-black border-b-[1px] px-3 text-start flex items-center">
                <h1>Nutrition Guide</h1>
              </div>
              <div className="col-start-2 hover:row-span-3 border-black border-b-[1px] px-3 text-start flex items-center">
                <h1>Weight Tracker</h1>
              </div> */}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 h-auto border border-white rounded-2xl bg-[#BFBD5F]">
            <div className="max-md:grid-cols-1 grid grid-cols-2 ">
              <div className="max-md:hidden grid grid-cols-subgrid gap-4 px-12 m-4 rounded-2xl">
                <div className="flex text-start items-center">
                  <h1 className="max-xl:text-4xl text-5xl leading-snug ">
                    <>
                      Sustainable Diet Solution For Our Client Future Mindset,
                      With Colaboration
                    </>
                  </h1>
                </div>
              </div>
              <div className="grid grid-cols-subgrid gap-4 px-7 m-4 rounded-2xl">
                <div className="col-start-2 flex px-2 text-start items-top mt-4">
                  <div className="flex items-center pb-1 justify-center border rounded-full w-[120px] h-9 bg-[#E2E0B6]">
                    <h1 className="text-md">
                      <b>Our Products</b>
                    </h1>
                  </div>
                </div>
                <div className="col-start-2 px-2 text-start flex items-end">
                  <h1 className="text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Molestiae dolorum quidem pariatur dolore, exercitationem ea
                    placeat! Quasi, molestias eveniet neque voluptatem cumque
                    debitis, cum porro iste perferendis, iusto sit hic?
                  </h1>
                </div>
                <div className="col-start-2 px-2 text-start flex items-center">
                  <div className="flex items-center pb-1 justify-center rounded-[12px] w-28 h-10 bg-black">
                    <h1 className="text-white">See More</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-md:grid-cols-1 grid grid-cols-2 ">
              <div className="max-md:hidden grid grid-cols-2 bg-[#E2E0B6] gap-4 m-4 rounded-2xl">
                <div className="items-center rounded-xl d-block relative overflow-hidden w-[16rem] h-[16rem] m-3">
                  <img
                    src={imgDiet}
                    alt="banner"
                    type="image/webp"
                    className="object-cover w-[16rem] h-[16rem]"
                  />
                </div>
                <div className="grid grid-cols-subgrid gap-2 px-2 m-2 rounded-2xl">
                  <div className="col-start-2 flex text-start items-center">
                    <div className="flex items-center pt-1 justify-center border rounded-full w-[130px] h-9 bg-[#E2E0B6]">
                      <h1 className="text-xl">
                        <b>Our Products</b>
                      </h1>
                    </div>
                  </div>
                  <div className="col-start-2 px-2 pb-5 text-start flex items-end">
                    <h1 className="text-sm">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Molestiae dolorum quidem pariatur dolore, exercitationem
                      ea placeat! Quasi, molestias eveniet neque voluptatem
                      cumque debitis, cum porro iste perferendis, iusto sit hic?
                    </h1>
                  </div>
                  <div className="col-start-2 px-1 text-start flex items-center">
                    <div className="flex items-center pb-1 justify-center rounded-[12px] w-24 h-8 bg-black">
                      <h2 className="text-white">See More</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-md:hidden grid grid-cols-2 bg-[#E2E0B6] gap-4 m-4 rounded-2xl">
                <div className="items-center rounded-xl d-block relative overflow-hidden w-[16rem] h-[16rem] m-3">
                  <img
                    src={imgDiet}
                    alt="banner"
                    type="image/webp"
                    className="object-cover w-[16rem] h-[16rem]"
                  />
                </div>
                <div className="grid grid-cols-subgrid gap-2 px-2 m-2 rounded-2xl">
                  <div className="col-start-2 flex text-start items-center">
                    <div className="flex items-center pt-1 justify-center border rounded-full w-[130px] h-9 bg-[#E2E0B6]">
                      <h1 className="text-xl">
                        <b>Our Products</b>
                      </h1>
                    </div>
                  </div>
                  <div className="col-start-2 px-2 pb-5 text-start flex items-end">
                    <h1 className="text-sm">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Molestiae dolorum quidem pariatur dolore, exercitationem
                      ea placeat! Quasi, molestias eveniet neque voluptatem
                      cumque debitis, cum porro iste perferendis, iusto sit hic?
                    </h1>
                  </div>
                  <div className="col-start-2 px-1 text-start flex items-center">
                    <div className="flex items-center pb-1 justify-center rounded-[12px] w-24 h-8 bg-black">
                      <h2 className="text-white">See More</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="rounded-xl d-block relative overflow-hidden max-h-100">
              <img
                src={imgDiet2}
                alt="banner"
                type="image/webp"
                className="object-cover w-full h-[25rem] pb-[3rem]"
              />
            </div> */}
          </div>
        </div>
        <h1>Halo</h1>
      </div>
    </>
  );
};

export default Layout;
