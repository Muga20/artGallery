import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../middleware/Api";

function MyCollection() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  
  // Uses a useEffect hook to fetch user collections from an API on component mount, with a 2-second loading simulation, and clears the timeout if the component unmounts.
  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await api(
          `/collection/get_collections_by_user_visited/${id}?page=${page}&pageSize=${pageSize}`,
          "GET",
          {},
          {}
        );
        setCollections(response.collectionsWithStats);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setLoading(false);
      }
    };

    // Simulate loading for 2 seconds
    const loadingTimeout = setTimeout(() => {
      getCollections();
    }, 2000);

    // Clear the timeout if the component unmounts before 2 seconds
    return () => clearTimeout(loadingTimeout);
  }, [page, pageSize]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-white font-semibold"> Collection</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {loading
          ? // Placeholder cards with flashing animation during loading
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md h-48 animate-pulse"
              ></div>
            ))
          : collections.map((collection) => (
              <div
                key={collection.id}
                className="rounded-lg shadow-lg bg-white h-auto"
              >
                <Link
                  to={`/single-collection/${collection.id}`}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <img
                    className="rounded-t-lg object-cover h-48 w-full"
                    src={collection.image}
                    alt={`Collection - ${collection.name}`}
                  />
                </Link>
                <div className="rounded-lg p-2">
                  <h5 className="text-gray-900 text-md lg:text-lg font-semibold pt-2 mb-3">
                    {collection.name}
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center">
                      <p className="text-gray-700 text-sm mb-1">Floor price</p>
                      <p className="text-gray-900 text-md lg:text-lg font-bold">
                        Ksh{" "}
                        {collection.floor_price > 500000
                          ? `${(collection.floor_price / 1000000).toFixed(1)}m`
                          : collection.floor_price}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-700 text-sm mb-1">Revenue</p>
                      <p className="text-gray-900 text-md lg:text-lg font-bold">
                        Ksh{" "}
                        {collection.total_collection_revenue > 500000
                          ? `${(
                              collection.total_collection_revenue / 1000000
                            ).toFixed(1)}m`
                          : collection.total_collection_revenue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-around w-40 pt-10">
                <button className="text-white cursor-pointer" onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Previous
                </button>
                <span className="text-white">{page}</span>
                <button className="text-white  cursor-pointer" onClick={() => setPage(page + 1)} disabled={collections.length < pageSize}>
                  Next
                </button>
      </div>

    </div>
  );
}

export default MyCollection;
