import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../middleware/Api";

function CollectionCat() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getAllCollectionsAndArts = async () => {
      try {
        const response = await api(
          "/tags/get_all_collections_by_tag",
          "GET",
          {},
          {}
        );

        setCollections(response.filteredTags);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching all data:", error);
        setLoading(false);
      }
    };

    const loadingTimeout = setTimeout(() => {
      getAllCollectionsAndArts();
    }, 2000);

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
    <div className="mb-10">
      <div className="pt-20 lg:px-7 px-1">
        <div className="">
          <div className="">
            {
              collections.map((tag) => (
                  <div>
                    <h1 className="mb-6 ml-7 text-2xl text-white font-bold">
                      Trending In {tag.name}
                    </h1>
                    <div className="py-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-1">
                      {tag.collections &&
                        tag.collections.map((collection, index) => (
                          <div className="p-2">
                            <div
                              className="bg-gray-300 rounded-lg shadow-md h-64 lg:h-48"
                              key={collection.name}
                            >
                              <div className="overflow-hidden rounded-t-lg">
                                {/* Use the actual property from the API for the link */}
                                <Link to={`/single-collection/${collection.id}`}>
                                  <img
                                    src={collection.image} // Use the actual property from the API
                                    className="object-cover object-top h-28 w-full"
                                    loading="lazy"
                                  />
                                </Link>
                              </div>
                              <div className="flex flex-col lg:flex-row pb-2">
                                <div className="relative mx-3 w-16 h-16 -mt-8">
                                  <img
                                    src={collection.cover_photo} // Use the actual property from the API
                                    className="object-cover rounded-full w-full h-16"
                                    loading="lazy"
                                  />
                                </div>

                                <div className="pt-2 space-x-3">
                                  <h4 className="text-gray-700 text-xl px-1 lg:px-1.5">
                                    {collection.name}
                                  </h4>
                                </div>
                              </div>

                              <div className="flex flex-col md:flex-row pl-3 space-y-2 lg:space-y-0">
                                <p className="text-gray-700 text-md px-1 lg:px-1.5 border rounded-md inline-flex mr-4">
                                  FP {formatNumber(collection.floor_price)}
                                </p>
                                <p className="text-gray-700 text-md px-1 lg:px-1.5 border rounded-md inline-flex mr-4">
                                  Rev {formatNumber(collection.total_collection_revenue)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionCat;