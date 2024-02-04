import React from "react";
import {
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { UseCartContext } from "../../hooks/UseCartContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../middleware/Api";
import io from "socket.io-client";
import { ServerUrl } from "../../config/ServerUrl";
import { AiFillHeart } from "react-icons/ai";
import { getAccessTokenFromCookie } from "../../config/AccessToken";

const socket = io.connect(ServerUrl);

export default function SingleArt() {
  const { id } = useParams();
  const [product, setArts] = useState({});
  const [message, SetMessage] = useState('');
  const { cartItems, removeFromCart, addToCart } = UseCartContext();
  const checkIfAdded = (product) =>
    cartItems.find((item) => item.id === product.id);


    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    
  // Defines a 'refreshData' function to fetch collection data for a specific user by ID from an API and
  //updates the component's state with the retrieved data using a useEffect hook that runs when the 'id' dependency changes.
  const refreshData = async () => {
    try {
      const response = await api(`/art/get_art_by_id/${id}`, "GET", {}, {});
      SetMessage(response.message);
      setArts(response.art);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshData();
  }, [id]);

  const accessToken = getAccessTokenFromCookie();

  useEffect(() => {
  
    // Send a request to the server when the component mounts
    socket.emit("checkUser", { userId: accessToken });

    // Listen for a response from the server
    socket.on("userStatus", (data) => {
      if (data.registered) {
        // User is registered, retrieve the token
       
        if (accessToken) {
          // Do something with the user's token
        } else {
          console.error("User is registered but token not found.");
        }
      } else {
        // User is not registered, assign a random ID
        const randomId = generateRandomId();
      }
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [id]);

  function generateRandomId() {
    const randomId = Math.floor(Math.random() * 1000000); // Change the range as needed
    return randomId;
  }

  //function for checking date
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    if (isNaN(date)) {
      return "Invalid Date";
    }

    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleString(undefined, options);
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        
   
            {message ? (
                <div className="py-5 bg-white rounded-md">
                <p className="text-black text-sm font-semibold text-center">
                {`${message} `}<Link to={`/edit-art/${product.id}`}> <span className='hover:text-red-500'>Edit</span> </Link>
                </p>
              </div>
            ):null}
       
        

        <div className="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:mt-4 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className=" overflow-hidden rounded-lg">
              <img
                className="h-96 w-full object-cover"
                src={product.image}
                alt=""
              />
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-lg lg:text-xl font-bold text-white">
              {product.name}
            </h1>

            <div className="pt-3">
              <div className="bg-gray-300 p-3 bg-opacity-40 rounded-lg flex ">
                <ul className="flex gap-4">
                  <li className="text-xl flex">
                    {product.likesCount > 0 ? (
                      <AiFillHeart  className="text-red-500" />
                    ) : (
                      <AiFillHeart  className="text-white" />
                    )}
                    <span className="pl-1 text-lg lg:text-xl text-white">
                      {" "}
                    </span>{" "}
                    <span className="pl-1 text-lg lg:text-xl text-white">
                      {product.likesCount} Favorites
                    </span>
                  </li>

                  <li className="text-xl	flex">
                    <BiCategoryAlt className="text-white" />{" "}
                    <span className="pl-1 text-lg lg:text-xl text-white">
                      {" "}
                      {product.category}{" "}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3">
              <div className="bg-gray-300 bg-opacity-40 rounded-lg p-3">
              <h3 class="text-lg font-medium text-white py-3">Art Info</h3>

               <div class="grid mx-5 grid-cols-2 items-center justify-around">
                  <div class="mb-5">
                      <h3 class="text-lg font-medium text-white">Date</h3>
                      <ul class="list-disc space-y-2 pl-4">
                        <li class="text-base text-gray-400">{formatTimestamp(product.createdAt)}{" "}</li>
                      </ul>
                   </div>

                   <div class="mb-5">
                      <h3 class="text-lg font-medium text-white">Current Price</h3>
                      <ul role="list" class="list-disc space-y-2 pl-4">
                        <li class="text-base text-gray-400"> ksh {product.price}</li>
                      </ul>
                   </div>

                  <div class="mb-5">
                      <h3 class="text-lg font-medium text-white">Description</h3>
                      <ul class="list-disc space-y-2 pl-4">
                        <li class="text-base text-gray-400">{product.description}</li>
                      </ul>
                   </div>


                    <div class="mb-5">
                      <h3 class="text-lg font-medium text-white">Medium Used</h3>
                      <div class="mt-2">
                        <ul role="list" class="list-disc space-y-2 pl-4">
                          {product.art_mediums &&
                            product.art_mediums.map((medium, index) => (
                              <li key={index} class="text-gray-400">
                                <span class="text-gray-400">{medium}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <div class="mb-5">
                      <h2 class="text-lg font-medium text-white">Measurements (Meters)</h2>
                      <div class="mt-4 space-y-2">
                        <p class="text-md text-gray-400">
                          <li>{product.width} Width</li>
                          <li>{product.height} Height</li>
                        </p>
                      </div>
                    </div>


                    <div>
                      <h2 class="text-lg font-medium text-white">Details</h2>
                      <ul class="list-disc space-y-2 pl-4">
                        <li class="text-md text-gray-400">
                          Serial <span>{product.serial}</span>
                        </li>
                        <li class="text-md text-gray-400">
                          Year Made <span>{product.year}</span>
                        </li>
                      </ul>
                    </div>
               </div>

                {/* <div className="mt-10 space-y-4">
                  {checkIfAdded(product) ? (
                    <div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 bg-opacity-70"
                      >
                        Remove from cart
                      </button>
                      <br></br>

                      <Link
                        to="/cart"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 bg-opacity-70"
                      >
                        Buy Now
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 bg-opacity-70"
                    >
                      Add to cart
                    </button>
                  )}
                </div> */}

              </div>
            </div>
          </div>
          </div>

          <div class="lg:col-span-12">
          <div className="bg-gray-300 p-3 bg-opacity-40 rounded-lg w-full">
            <h3 class="text-lg font-medium text-white py-3">Seller Info</h3>

            <div class="grid grid-cols-1 mx-5 sm:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row items-center justify-around">
            <div class="mb-5">
              <h3 class="text-white">Name:</h3>
              <div class="space-y-2">
                <p class="text-base text-white">
                  <Link to={`/account/profile-for/${product.users?.id}`}>
                    {product.users?.first_name} {product.users?.last_name}
                   </Link>
                 </p>
              </div>
            </div>


            <div class="mb-5">
              <h3 class="text-white">username:</h3>
              <div class="space-y-2">
                <p class="text-base text-white">
                  <Link to={`/account/profile-for/${product.users?.id}`}>{product.users?.username}</Link>
                </p>
              </div>
            </div>

            </div>
          </div>
        </div>   
      </div>
    </section>
  );
}
