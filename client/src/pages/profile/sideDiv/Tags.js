import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../middleware/Api";

function Tags() {
  const [tags, setTags] = useState([]);

  // Uses a useEffect hook to fetch all tags from an API on component mount and 
  //sets the retrieved tags in the component's state.
  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await api("/tags/get_all", "GET", {}, {});
        setTags(response);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    getTags();
  }, []);

  // Defines an asynchronous function 'handleDeleteTags' that sends a DELETE request to remove tags by ID from an API and 
  //updates the component state to reflect the removal, handling errors if they occur.
  const handleDeleteTags = async (id) => {
    try {
      const response = await api(`/tags/delete_tags/${id}`, "DELETE", {}, {});

      // Remove the deleted category from the state
      setTags(tags.filter((tags) => tags.id !== id));
    } catch (error) {
      console.error("Error deleting tags:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-white font-semibold">Tags</h2>
        <Link
          to="/create-tags"
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <span className="mr-2">Create a Tag</span>
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tags.map((tags) => (
          <div key={tags.id} className="bg-gray-300 p-4 rounded-lg shadow-md">
            <div className="text-gray-900 text-center mt-2 text-lg font-semibold">
              {tags.name}
            </div>
            <button
              onClick={() => handleDeleteTags(tags.id)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tags;
