import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../middleware/Api";
function MyArts() {
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  
  
  // Utilizes a useEffect hook to retrieve arts related to a visited user from an API when the component mounts, updating component state and handling loading and errors.
  useEffect(() => {
    const getArts = async () => {
      try {
        const response = await api(
          `/art/get_all_arts_for_visited_user/${id}?page=${page}&pageSize=${pageSize}`,
          "GET",
          {},
          {}
        );

        setArts(response.arts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setLoading(false);
      }
    };

    // Simulate loading for 2 seconds
    const loadingTimeout = setTimeout(() => {
      getArts();
    }, 2000);

    // Clear the timeout if the component unmounts before 2 seconds
    return () => clearTimeout(loadingTimeout);
  }, [page, pageSize]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-white font-semibold"> Arts </h2>
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
          : arts?.map((arts) => (
              <div
                key={arts.id}
                className="rounded-lg shadow-lg bg-white h-auto"
              >
                <Link
                  to={`/single-art/${arts.id}`}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <img
                    className="rounded-t-lg object-cover h-48 w-full"
                    src={arts.image}
                    alt={`Art- ${arts.name}`}
                  />
                </Link>
                <div className="rounded-lg p-2">
                  <h5 className="text-gray-900 text-lg font-semibold pt-2 mb-3">
                    {arts.name}
                  </h5>
                  <p className="text-gray-700 font-semibold text-base">
                  Ksh {arts.price}
                </p>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-around w-40 pt-10">
                <button className="text-white cursor-pointer" onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Previous
                </button>
                <span className="text-white">{page}</span>
                <button className="text-white  cursor-pointer" onClick={() => setPage(page + 1)} disabled={arts.length < pageSize}>
                  Next
                </button>
      </div>

    </div>
  );
}

export default MyArts;
