import React, { useEffect, useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { Link } from "react-router-dom";
import { api } from "../../../middleware/Api";
import { BsFillTrashFill } from "react-icons/bs";

function MyCollection() {
  const [collections, setCollections] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);


  // Uses a useEffect hook to fetch collections by a user from an API on component mount and updates the component's state with the retrieved data.
  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await api(
          `/collection/get_collections_by_user?page=${page}&pageSize=${pageSize}`,
          "GET",
          {},
          {}
        );
        setCollections(response.collectionsWithStats);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    getCollections();
 }, [page, pageSize]);

  //it deletes collection
  const handleDeleteCollection = async (id) => {
    try {
      const response = await api(
        `/collection/delete_collection/${id}`,
        "DELETE",
        {},
        {}
      );

      // Remove the deleted category from the state
      setCollections(collections.filter((collection) => collection.id !== id));
    } catch (error) {
      console.error("Error deleting Collections:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md lg:text-2xl text-white font-semibold">My Collection</h2>
        <Link
          to="/create-collection"
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 lg:py-2 px-1 lg:px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <span className="lg:mr-2">Create Collection</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {collections.map((collection) => (
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
              <div className="flex justify-between items-center">
                <h5 className="text-gray-900 text-lg font-semibold pt-2 mb-3">
                  {collection.name}
                </h5>

                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleDeleteCollection(collection.id)}
                >
                  <BsFillTrashFill />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="text-center">
                  <p className="text-gray-700 text-sm mb-1">Floor price</p>
                  <p className="text-gray-900 text-lg font-bold">
                    Ksh{" "}
                    {collection.floor_price > 500000
                      ? `${(collection.floor_price / 1000000).toFixed(1)}m`
                      : collection.floor_price}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 text-sm mb-1">Revenue</p>
                  <p className="text-gray-900 text-lg font-bold">
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
