import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../middleware/Api";
import HeroOne from "./hero-section/HeroOne";
//import HeroTwo from "./hero-section/HeroTwo";

function HomeContent() {
  const [selectedLink, setSelectedLink] = useState(null);
  const [category, setCategories] = useState([]);
  const [showHeroOne, setShowHeroOne] = useState(true);

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
                className={`text-white text-sm ${
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
                  className={`text-white text-md ${
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

  
      <HeroOne />
    </div>
  );
}

export default HomeContent;
