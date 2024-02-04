import React, { useState, useEffect } from "react";
import { api } from "../../../middleware/Api";
import { Link } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);

  // Utilizes a useEffect hook to fetch categories from an API on component mount and updates the component's state with the retrieved data, 
  //with an empty dependency array indicating this effect runs only once when the component mounts.
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api("/category/get_categories", "GET", {}, {});
        setCategories(response.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);


  //function for deleting category
  const handleDeleteCategory = async (id) => {
    try {
      const response = await api(
        `/category/delete_categories/${id}`,
        "DELETE",
        {},
        {}
      );
   

      // Remove the deleted category from the state
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="p-5">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-white font-semibold">Category</h2>
        <Link
          to="/create-category"
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <span className="mr-2">Create Category</span>
        </Link>
      </div>

      {/* Grid for displaying categories */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-200 p-4 rounded-lg shadow-md" //  drop shadow for each category
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="text-gray-900 text-center mt-2 text-lg font-semibold">
              {" "}
              {/* Increased font size and font weight */}
              {category.name}
            </div>
            <button
              onClick={() => handleDeleteCategory(category.id)}
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

export default Category;
