import React, { useEffect, useState } from "react";
import { api } from "../../middleware/Api";

function HeroOne() {
  // State to store collections and the index of the current collection to display
  const [collections, setCollections] = useState([]);
  const [currentCollectionIndex, setCurrentCollectionIndex] = useState(0);

  // Function to fetch collections from the API
  const getAllCollections = async () => {
    try {
      const response = await api(
        "/collection/get_collections_for_hero_section",
        "GET",
        {},
        {}
      );
      setCollections(response.arts);
    } catch (error) {
      console.error("Error getting collections:", error);
    }
  };

  // Fetch collections when the component mounts
  useEffect(() => {
    getAllCollections();
  }, []);

  // Set up a slideshow interval to cycle through collections
  useEffect(() => {
    const slideshowInterval = setInterval(() => {
      // Increment the index to display the next collection
      setCurrentCollectionIndex(
        (prevIndex) => (prevIndex + 1) % collections.length
      );
    }, 30000); // 30 seconds interval

    // Clear the slideshow interval when the component unmounts
    return () => clearInterval(slideshowInterval);
  }, [collections]);

  
  return (
    <div>
      <div className="pt-4 pb-6 pl-4 pr-4 md:pl-16 md:pr-16">
        <section>
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`relative bg-cover bg-center rounded-3xl ${
                index === currentCollectionIndex ? "" : "hidden"
              }`}
              style={{
                backgroundImage: `url(${collection.cover_photo})`,
                height: "500px",
              }}
            >
              <ul className="absolute bottom-0 left-0 p-6 md:p-12 bg-black bg-opacity-30 list-none rounded-3xl">
                <img
                  className="h-16 w-16 md:h-20 md:w-20 border border-gray-500 rounded-full"
                  src={collection.image}
                  alt="logo"
                />
                <li className="text-white text-xl md:text-4xl font-bold">
                  {collection.name}
                </li>
                <li className="text-white text-lg md:text-xl font-bold">
                  Owner {collection.user}
                </li>
                <div className="flex gap-1">
                  <li className="text-white text-sm md:text-base">
                    Floor {collection.floor_price}
                  </li>
                  {/* Add more content here */}
                </div>
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default HeroOne;
