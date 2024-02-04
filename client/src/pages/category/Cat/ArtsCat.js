import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../middleware/Api";
import { UseCartContext } from "../../../hooks/UseCartContext";

function ArtsCat() {
    const [arts, setArts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cartItems, addToCart, removeFromCart } = UseCartContext();
    const checkIfAdded = (item) =>
    cartItems.find((art) => art.id === item.id);
  
    // Defines a 'refreshData' function to fetch collection data for a specific user by ID from an API and
    //updates the component's state with the retrieved data using a useEffect hook that runs when the 'id' dependency changes.
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    
    useEffect(() => {
      const getAllCollectionsAndArts = async () => {
        try {
          const response = await api("/art/get_all", "GET", {}, {});
  
          setArts(response.arts);
  
          setLoading(false);
        } catch (error) {
          console.error("Error fetching all data:", error);
          setLoading(false);
        }
      };
  
      // Simulate loading for 2 seconds
      const loadingTimeout = setTimeout(() => {
        getAllCollectionsAndArts();
      }, 2000);
  
      // Clear the timeout if the component unmounts before 2 seconds
      return () => clearTimeout(loadingTimeout);
    }, []);
  
    function formatNumber(number) {
      if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + " B";
      } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + " M";
      } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + " K";
      } else {
        return number.toFixed(2);
      }
    }
    
  return (
    <div className="mb-10">
      {" "}
      <div className="pt-20 lg:px-7 px-1">
        <h1 className="mb-6 ml-7  text-white text-2xl font-bold">
          Notable Arts
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 px-1 gap-5">
          {loading
            ? // Placeholder cards with flashing animation during loading
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md h-48 animate-pulse"
                ></div>
              ))
            : arts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md h-48 transform"
                >
                  <div class="overflow-hidden rounded-t-lg mx-auto transition-transform transform">
                    <Link to={`/single-art/${item.id}`}>
                      <img
                        src={item.image}
                        class="object-cover object-top h-28 w-full"
                      />
                    </Link>
                  </div>
                  <div className="rounded-lg">
                    <h5 className="text-gray-900 text-xl pt-1 pl-2">
                      {item.name}
                    </h5>

                    <h5 className="text-gray-900 text-xl pt-1 pl-2">
                      Ksh {item.price}
                    </h5>

                    {/* <div className="absolute bottom-0 left-0 right-0 p-2 bg-white opacity-0 hover:opacity-100 transition-opacity rounded-md">
                      {checkIfAdded(item) ? (
                        <button
                          onClick={() => removeFromCart(item.id)}
                          class=" bg-slate-500 text-white px-1.5 py-1 rounded-md"
                        >
                          Remove from cart
                        </button>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          class="bg-blue-500 text-white px-1.5 py-1 rounded-md"
                        >
                          Add to cart
                        </button>
                      )}
                    </div> */}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default ArtsCat;
