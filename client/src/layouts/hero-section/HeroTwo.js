import React, { useEffect, useState } from "react";
import { api } from "../../middleware/Api";
import { Link } from "react-router-dom";

function HeroTwo() {
  // State to store Arts and the index of the current collection to display
  const [arts, setArts] = useState([]);
  const [currentCollectionIndex, setCurrentCollectionIndex] = useState(0);
  const [displayedArts, setDisplayedArts] = useState([]);


  // Function to fetch Arts from the API
  const getAllArts = async () => {
    try {
      const response = await api(
        "/art/get_arts_for_hero_section",
        "GET",
        {},
        {}
      );
      setArts(response.combinedArtsData);
    } catch (error) {
      console.error("Error getting arts:", error);
    }
  };

  // Fetch arts when the component mounts
  useEffect(() => {
    getAllArts();
  }, []);

  // Preload Images for the Next Set of Arts
  const preloadImages = (startIndex) => {
    const endIndex = (startIndex + 3) % arts.length;
    const nextImages = arts.slice(startIndex, endIndex);
    nextImages.forEach((art) => {
      const img = new Image();
      img.src = art.image;
    });
  };

  useEffect(() => {
    const slideshowInterval = setInterval(() => {
      setCurrentCollectionIndex((prevIndex) => (prevIndex + 1) % arts.length);
    }, 15000); // 15 seconds interval

    return () => clearInterval(slideshowInterval);
  }, [arts]);

  // Calculate the range of indices to display (3 at a time)
  useEffect(() => {
    const startIndex = currentCollectionIndex % arts.length;
    let endIndex = (startIndex + 3) % arts.length;
    if (endIndex < startIndex) {
      endIndex = startIndex + 3;
    }

    setDisplayedArts(arts.slice(startIndex, endIndex));

    // Preload images for the next set of arts
    preloadImages(endIndex);
  }, [arts, currentCollectionIndex]);

  return (
    <div className="pt-4 pb-6 pl-4 pr-4 md:pl-16 md:pr-16">
      <div className="flex gap-5">
        {displayedArts.map((art, index) => (
          <div key={index} className="max-w-lg relative">
            <div className="">
              <Link to={`/single-art/${art.id}`}>
                <img
                  src={art.image}
                  alt={`Artwork - ${art.name}`}
                  className="w-[500px] h-[400px] object-cover rounded" // Set a fixed width and height
                />
              </Link>
            </div>

            <div className="absolute bottom-0 left-0 w-full md:w-36 h-16 bg-black bg-opacity-70 rounded">
              <div className="absolute bottom-0 left-0 w-16 h-16 rounded overflow-hidden shadow-md">
                <Link to={`/account/profile-for/${art.userId}`}>
                  <img
                    src={art.userImage} // Replace with your smaller image URL
                    alt="Small Image"
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
              <p className="absolute bottom-0 left-16 font-semibold text-white">
                {art.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroTwo;
