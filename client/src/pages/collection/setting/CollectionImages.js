import React, { useState, useEffect, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { api } from "../../../middleware/Api";

function CollectionImages() {
  const { id } = useParams();
  const [collection, setCollections] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);

  // Defines a 'refreshData' function to fetch collection data for a specific user by ID from an API and
  // updates the component's state with the retrieved data using a useEffect hook that runs when the 'id' dependency changes.
  const refreshData = async () => {
    try {
      const response = await api(
        `/collection/get_collection_by_id_for_user/${id}`,
        "GET",
        {},
        {}
      );
      setCollections(response.collectionData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshData();
  }, [id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

    useEffect(() => {
    // Simulate a loading delay for demonstration purposes
    const loadingTimeout = setTimeout(() => {
      setImageLoaded(true);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(loadingTimeout);
  }, []); // This effect runs only once when the component mounts


  return (
    <div>
      <div className="relative p-4">
        {/* Main Image */}
        <div className="relative w-full h-96 mr-4 rounded-lg shadow-lg">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-40"></div>
          
          {/* Loading Placeholder */}
          {!imageLoaded && (
              <div className="h-96 w-full object-cover">
              {/* Placeholder cards with flashing animation */}
              {Array.from({ length: 1 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md h-full animate-pulse"
                  c
                ></div>
              ))}
            </div>
          )}

          <img
            src={collection.cover_photo}
            alt="Top Image"
            className={`w-full h-full rounded-lg ${imageLoaded ? '' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Second Image */}
        <div
          className="absolute bottom-10 left-10 w-24 h-24 border-white border rounded-lg overflow-hidden"
          style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)" }}
        >
            {!imageLoaded && (
              <div className="h-96 w-full object-cover">
              {/* Placeholder cards with flashing animation */}
              {Array.from({ length: 1 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md h-full animate-pulse"
                  c
                ></div>
              ))}
            </div>
          )}

          <img
            src={collection.image}
            alt="Left Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-20 left-36">
          <h1 className="text-2xl font-bold text-gray-200">{collection.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default CollectionImages;
