import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../middleware/Api";
import HeroOne from "./hero-section/HeroThree";

function SingleCategory() {
  const [collections, setCollections] = useState([]);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // Defines a 'refreshData' function to fetch collection data for a specific user by ID from an API and
  //updates the component's state with the retrieved data using a useEffect hook that runs when the 'id' dependency changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  useEffect(() => {
    const getAllCollectionsAndArts = async () => {
      try {
        const response = await api(
          `/category/get_all_arts_in_category/${id}`,
          "GET",
          {},
          {}
        );
 
        setArts(response.checkArt);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching all data:", error);
        setLoading(false);
      }
    };

    // Simulate loading for 2 seconds
    const loadingTimeout = setTimeout(() => {
      getAllCollectionsAndArts();
    }, 2000);

    // Clear the timeout if the component unmounts before 2 seconds
    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    const getAllCollectionsAndArts = async () => {
      try {
        const response = await api(
          `/category/get_all_collection_and_arts_in_category/${id}`,
          "GET",
          {},
          {}
        );

        setCollections(response.collectionsWithStats);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching all data:", error);
        setLoading(false);
      }
    };

    // Simulate loading for 2 seconds
    const loadingTimeout = setTimeout(() => {
      getAllCollectionsAndArts();
    }, 2000);

    // Clear the timeout if the component unmounts before 2 seconds
    return () => clearTimeout(loadingTimeout);
  }, []);

  function formatNumber(number) {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(2) + " B";
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(2) + " M";
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(2) + " K";
    } else {
      return number.toFixed(2);
    }
  }

  return (
    <div>
      <HeroOne />

      <div className="mb-10">
        <div className="pt-20 lg:px-7 px-1">
          <h1 className="mb-6 ml-7 text-2xl text-white font-bold">
            Collections in this Category
          </h1>
          <div className="">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
              {loading
                ? // Placeholder cards with flashing animation during loading
                  Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md h-48 animate-pulse"
                    ></div>
                  ))
                : // Actual collection cards
                  collections.map((item) => (
                    <div
                      className="bg-white rounded-lg shadow-md  h-64 lg:h-48"
                      key={item.id}
                    >
                      <div className="overflow-hidden rounded-t-lg">
                        <Link to={`/single-collection/${item.id}`}>
                          <img
                            src={item.image}
                            className="object-cover object-top h-28 w-full"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                      <div className="flex flex-col lg:flex-row pb-2">
                        <div className="relative mx-3 w-16 h-16 -mt-8">
                          <img
                            src={item.cover_photo}
                            className="object-cover rounded-full w-full h-16"
                            loading="lazy"
                          />
                        </div>

                        <div className="pt-2 space-x-2">
                          <h4 className="text-gray-700 text-xl px-1 lg:px-1.5">
                            {item.name}
                          </h4>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row pl-3 space-y-2 lg:space-y-0">
                        <p className="text-gray-700 text-md px-1 lg:px-1.5 border rounded-md inline-flex mr-4">
                          FP {formatNumber(item.floor_price)}
                        </p>
                        <p className="text-gray-700 text-md px-1 lg:px-1.5 border rounded-md inline-flex mr-4">
                          Rev {formatNumber(item.total_collection_revenue)}
                        </p>
                     </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        <div className="pt-20 lg:px-7 px-1">
          <h1 className="mb-6 ml-7  text-white text-2xl font-bold">
            Ars in this Category
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 px-1 gap-5">
            {loading
              ? // Placeholder cards with flashing animation during loading
                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md h-48 animate-pulse"
                  ></div>
                ))
              : arts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md h-48 transform"
                  >
                    <div class="overflow-hidden rounded-t-lg mx-auto transition-transform transform">
                      <Link to={`/single-art/${item.id}`}>
                        <img
                          src={item.image}
                          class="object-cover object-top h-28 w-full"
                        />
                      </Link>
                    </div>
                    <div className="rounded-lg">
                      <h5 className="text-gray-900 text-xl pt-1 pl-2">
                        {item.name}
                      </h5>

                      <h5 className="text-gray-900 text-xl pt-1 pl-2">
                        Ksh {item.price}
                      </h5>

                      {/* <div className="absolute bottom-0 left-0 right-0 p-2 bg-white opacity-0 hover:opacity-100 transition-opacity rounded-md">
                        <button className="bg-blue-500 text-white px-1.5 py-1 rounded-md">
                          Add to Cart
                        </button>
                      </div> */}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCategory;
