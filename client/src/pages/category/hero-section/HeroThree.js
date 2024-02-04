import React, { useEffect, useState } from "react";
import { api } from "../../../middleware/Api";
import { Link, useParams } from "react-router-dom";

function HeroOne() {
  const [collections, setCollections] = useState([]);
  const [currentCollectionIndex, setCurrentCollectionIndex] = useState(0);
  // The component's rendering logic on home content displayed goes here.
  const [selectedLink, setSelectedLink] = useState(null);
  const [category, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await api(`/category/get_categories`, "GET", {}, {});
        setCategories(response.categories);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    getCollections();
  }, []);

  const handleLinkClick = (index) => {
    if (selectedLink !== index) {
      setSelectedLink(index);
    }
  };

  const getAllCollectionsAndArts = async () => {
    try {
      const response = await api(
        `/category/get_all_collection_for_hero_section/${id}`,
        "GET",
        {},
        {}
      );

      setCollections(response.collectionsWithStats);


    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

  useEffect(() => {
    getAllCollectionsAndArts();
  }, []);

  useEffect(() => {
    const slideshowInterval = setInterval(() => {
      // Increment the index to display the next collection
      setCurrentCollectionIndex(
        (prevIndex) => (prevIndex + 1) % collections.length
      );
    }, 30000); // 30 seconds interval

    // Clear the interval when the component unmounts
    return () => clearInterval(slideshowInterval);
  }, [collections]);

  return (
    <div>
      <div className="md:pl-40">
        <div
          className="flex space-x-4 pt-5 gap-1 md:overflow-x-auto md:flex-nowrap"
          style={{ overflowX: "auto" }}
        >
          <div
            className={`w-16 h-16 md:w-24 flex flex-col justify-center items-center rounded-2xl ${
              selectedLink === 0 ? "bg-gray-500" : ""
            }`}
          >
            <Link to="/" onClick={() => handleLinkClick(0)}>
              <span
                className={`text-white font-bold text-xl ${
                  selectedLink === 0 ? "" : ""
                }`}
              >
                All
              </span>
            </Link>
          </div>

          {/* Increase the width for smaller screens */}
          {category.map((item, index) => (
            <div
              className={`w-16 h-16 md:w-24 flex flex-col justify-center items-center rounded-2xl ${
                selectedLink === index + 1 ? "selected-link" : ""
              }`}
            >
              <a
                href={`/category/${encodeURIComponent(item.id)}`}
                onClick={() => handleLinkClick(index + 1)}
              >
                <span
                  className={`text-white font-bold text-md ${
                    selectedLink === index + 1 ? "" : ""
                  }`}
                >
                  {item.name}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
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
                  Owner {collection.user.username}
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
