import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../middleware/Api";

function Medium() {
  const [mediums, setMediums] = useState([]);

  // Uses a useEffect hook to fetch mediums from an API on component mount and updates the component's state with the retrieved data, 
  //with an empty dependency array indicating this effect runs only once when the component mounts.
  useEffect(() => {
    const getMediums = async () => {
      try {
        const response = await api("/medium/get_mediums", "GET", {}, {});
        setMediums(response);
      } catch (error) {
        console.error("Error fetching mediums:", error);
      }
    };
    getMediums();
  }, []);


  //function for deleting medium
  const handleDeleteMedium = async (id) => {
    try {
      const response = await api(
        `/medium/delete_mediums/${id}`,
        "DELETE",
        {},
        {}
      );

      // Remove the deleted category from the state
      setMediums(mediums.filter((medium) => medium.id !== id));
    } catch (error) {
      console.error("Error deleting medium:", error);
    }
  };

  return (
    <div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-white font-semibold">Medium</h2>
          <Link
            to="/create-medium"
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <span className="mr-2">Create a Medium</span>
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mediums.map((medium) => (
            <div
              key={medium.id}
              className="bg-gray-300 p-4 rounded-lg shadow-md"
            >
              <div className="text-gray-900 text-center mt-2 text-lg font-semibold">
                {medium.name}
              </div>
              <button
                onClick={() => handleDeleteMedium(medium.id)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Medium;
