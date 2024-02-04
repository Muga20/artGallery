import React, { useState } from "react";
import { AiOutlineShoppingCart, AiFillHeart } from "react-icons/ai";

function Filters() {
  // Initialize state variables for managing filter options and selections.
  const [isPriceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [isMediumDropdownOpen, setMediumDropdownOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isPriceRangeOpen, setPriceRangeOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handlePriceDropdownToggle = () => {
    // Function to toggle the visibility of the price dropdown and close other dropdowns.
    setPriceDropdownOpen(!isPriceDropdownOpen);
    setSizeDropdownOpen(false);
    setMediumDropdownOpen(false);
    setPriceRangeOpen(false);
  };

  const handleSizeDropdownToggle = () => {
    setSizeDropdownOpen(!isSizeDropdownOpen); // Toggle the visibility of the size dropdown.
    setPriceDropdownOpen(false); // Close the price dropdown.
    setMediumDropdownOpen(false); // Close the medium dropdown.
    setPriceRangeOpen(false); // Close the price range dropdown.
  };

  const handleMediumDropdownToggle = () => {
    setMediumDropdownOpen(!isMediumDropdownOpen);
    setPriceDropdownOpen(false);
    setSizeDropdownOpen(false);
    setPriceRangeOpen(false);
  };

  const handlePriceRangeToggle = () => {
    setPriceRangeOpen(!isPriceRangeOpen);
    setPriceDropdownOpen(false);
    setSizeDropdownOpen(false);
    setMediumDropdownOpen(false);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedFilters([...selectedFilters, currency]);
  };

  const handleSizeSelect = (size) => {
    setSelectedFilters([...selectedFilters, size]);
  };

  const handleMediumSelect = (medium) => {
    setSelectedFilters([...selectedFilters, medium]);
  };

  const handlePriceRangeSubmit = () => {
    setSelectedFilters([
      ...selectedFilters,
      `Price Range: ${minPrice} to ${maxPrice}`,
    ]);
  };

  return (
    <div className="h-screen bg-gray-900 p-4 lg:w-64 sticky top-0 rounded-lg ">
      {selectedFilters.length > 0 && (
        <div className="text-white mb-4">
          <h2 className="text-xl font-bold mb-2">Selected Filters:</h2>
          <ul className="flex flex-wrap">
            {selectedFilters.map((filter, index) => (
              <li
                key={index}
                className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2"
              >
                {filter}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative mb-4">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-md w-48"
          onClick={handlePriceDropdownToggle}
        >
          Filter by Price
        </button>
        {isPriceDropdownOpen && (
          <div className="relative mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md">
            <ul>
              <li
                className="px-4 py-2 text-white cursor-pointer"
                onClick={() => handleCurrencySelect("Kenyan Shilling (KES)")}
              >
                Kenyan Shilling (KES)
              </li>
              <li
                className="px-4 py-2 text-white cursor-pointer"
                onClick={() => handleCurrencySelect("US Dollar (USD)")}
              >
                US Dollar (USD)
              </li>
              <li
                className="px-4 py-2 text-white cursor-pointer"
                onClick={() => handleCurrencySelect("British Pound (GBP)")}
              >
                British Pound (GBP)
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="relative mb-4">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-md w-48"
          onClick={handleSizeDropdownToggle}
        >
          Filter by Size
        </button>
        {isSizeDropdownOpen && (
          <div className="relative mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md">
            <ul>
              <li
                className="px-4 py-2 text-white cursor-pointer"
                onClick={() => handleSizeSelect("Small")}
              >
                Small
              </li>
              <li
                className="px-4 py-2 text-white cursor-pointer"
                onClick={() => handleSizeSelect("Medium")}
              >
                Medium
              </li>
              <li
                className="px-4 py-2 text-white cursor-pointer"
                onClick={() => handleSizeSelect("Large")}
              >
                Large
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="relative mb-4">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-md w-48"
          onClick={handleMediumDropdownToggle}
        >
          Filter by Medium
        </button>
        {isMediumDropdownOpen && (
          <div className="relative mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md">
            <ul>
              <li
                className="px-4 py-2 text-white cursor-pointer"
                onClick={() => handleMediumSelect("Oil Painting")}
              >
                Oil Painting
              </li>
              <li
                className="px-4 py-2 text-white cursor-pointer"
                onClick={() => handleMediumSelect("Watercolor")}
              >
                Watercolor
              </li>
              <li
                className="px-4 py-2 text-white cursor-pointer"
                onClick={() => handleMediumSelect("Acrylic")}
              >
                Acrylic
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="relative mb-4">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-md w-48"
          onClick={handlePriceRangeToggle}
        >
          Set Price Range
        </button>
        {isPriceRangeOpen && (
          <div className="relative mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md p-2">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-2 py-1 rounded-md bg-gray-700 text-white mb-2 w-40"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-2 py-1 rounded-md bg-gray-700 text-white w-40"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
              onClick={handlePriceRangeSubmit}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filters;






