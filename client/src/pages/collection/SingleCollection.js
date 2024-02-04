import { Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { UseCartContext } from "../../hooks/UseCartContext";
import CollectionImages from "./setting/CollectionImages";
import { api } from "../../middleware/Api";
import { AiFillHeart } from "react-icons/ai";
import { UseAuthContext } from "../../hooks/UseAuthContext";
import jwt_decode from 'jwt-decode';

function SingleCollection() {
  const { cartItems, addToCart, removeFromCart } = UseCartContext();
  const { id } = useParams();
  const [collection, setCollections] = useState({});
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const[error, setError]=useState(null)
  const [isPriceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [isMediumDropdownOpen, setMediumDropdownOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isPriceRangeOpen, setPriceRangeOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [price, setPrice] = useState("");
  const { user } = UseAuthContext();
  const [medium, setMedium]= useState([])



  useEffect(() => {
    const getMediums = async () => {
      try {
        const response = await api("/medium/get_mediums_filter", "GET", {}, {});
        setMedium(response.mediums);
      } catch (error) {
        console.error("Error fetching mediums:", error);
      }
    };
    getMediums();
  }, []);


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
  // filter clean up 
  const clearFilters  = ()=>{
    setSelectedFilters([])
    window.location.reload()
  }

  const handleCurrencySelect = () => {
    // setSelectedFilters([...selectedFilters, currency]);
    // const filterCurrenct = collection.filter((money)=> money.price)
    const filter = collection.artworks.filter((user) => user.price == price);
    if (Array.isArray(filter)) {
     return  setCollections({ artworks: filter });
    }else{
      return null
    }
  };
  const handleSizeSelect = (size) => {
    setSelectedFilters([...selectedFilters, size]);
    console.log(size);

    // Calculate the dimensions and filter the collection based on the selected size
    const filteredCollection = collection?.artworks?.filter((artwork) => {
      // Calculate the width and height based on your artwork data structure
      const { width, height } = artwork;
      if (size === "small" && width + height <= 400) {
        return artwork; // Return true for small items
      } else if (
        (size === "medium" && width + height >= 400) ||
        width + height < 1500
      ) {
        return true; // Return true for medium items
      } else if (size === "large" && width + height >= 1500) {
        return true; // Return true for large items
      }
      return false;
    });

    console.log("Filtered collection based on size:", filteredCollection);
    if (Array.isArray(filteredCollection)) {
      return setCollections({ artwork: filteredCollection });
    } else {
      return null;
    }
  };


  const handleMediumSelect = (name) => {
    const filterMediums = medium.filter((single)=> single.name === name )
    setCollections({artworks : filterMediums})
    
    setSelectedFilters([...selectedFilters, name ]);
  };

  const handlePriceRangeSubmit = () => {
    const filteredItems = collection.artworks.filter(item => item.price == minPrice && item.price <= maxPrice);
if(filteredItems){
  setCollections({artworks : filteredItems})
  
}else{
  return null
}

    setSelectedFilters([
      ...selectedFilters,`Price Range: ${minPrice} to ${maxPrice}`,
    ]);
  };

 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const checkIfAdded = (product) =>
    cartItems.find((item) => item.id === product.id);


  // Defines a 'refreshData' function to fetch collection data for a specific user by ID from an API and
  //updates the component's state with the retrieved data using a useEffect hook that runs when the 'id' dependency changes.
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

  //for handling like art
  const handleLike = async (artId) => {
    try {
      const response = await api(
        `/art/create_like`,
        "POST",
        {},
        { artId: artId }
      );

      // Update likes count and isLiked state for the specific artwork
      setLikesCount((prevLikes) => ({
        ...prevLikes,
        [artId]: prevLikes[artId] + 1,
      }));
      setIsLiked((prevLiked) => ({ ...prevLiked, [artId]: true }));
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  //function for checking date
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    if (isNaN(date)) {
      return "Invalid Date";
    }

    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleString(undefined, options);
  };

  let usernameInfo;

  if (user) {
    const decodeToken = jwt_decode(user.accessToken?.accessToken);
    usernameInfo = decodeToken.userId.username;
  } else {
     console.log("user not not found");
  }
  

  return (
    <div>
      <CollectionImages />

      <div className="p5">
        <div className="p-7">
          <div className="bg-gray-900 p-5 rounded-lg">
          
          {collection.username === usernameInfo ? (
              <div className="">
              <h1 className="text-3xl font-bold text-white">
                {collection.name}
                <Link className="font-bold text-white pl-3">
                  <AiOutlineShareAlt className="inline-block " />
                </Link>
              </h1>
              <p className="text-gray-400">
                Owner:{" "}
                <span className="text-white">
                <Link to={`/account/profile-for/${collection.userId}`} className="text-white font-bold">
                  {collection.username}
                  </Link>
                </span>
              </p>
              <h2 className="text-gray-400">
                Category:{" "}
                <span className="text-white font-bold">
                  {collection.category_name}
                </span>
              </h2>
              <div class=" lg:flex lg:justify-start space-y-1 lg:space-y-0 pt-1">
                <div className="mr-4 text-gray-400">
                  Items :{" "}
                  <span className="text-white font-bold">
                    {collection.number_of_arts}
                  </span>
                </div>
                <div className="mr-4 text-gray-400">
                  Created :{" "}
                  <span className="text-white font-bold">
                    {formatTimestamp(collection.createdAt)}{" "}
                  </span>
                </div>
                <div className="mr-4 text-gray-400">
                  Creator Earnings : {" "}
                  <span className="text-white font-bold">Ksh {collection.creator_earning}</span>
                </div>
              </div>

              <p className="mt-4 text-gray-400"> Description </p>
              <p className="text-white ">{collection.description}</p>
              <div className="lg:flex lg:justify-start space-y-1 pt-2">
              <div className="mr-4 text-gray-400">
                <h1 className="text-gray-400">
                  Total Collection Revenue{" "}
                  <span className="block font-bold text-white">
                    Ksh {collection.total_collection_revenue}
                  </span>
                </h1>
               </div>
                <div className="mr-4 text-gray-400">
                <h1 className="text-gray-400">
                  Floor price{" "}
                  <span className="block text-white font-bold ">
                    Ksh {collection.floor_price}{" "}
                  </span>
                </h1>
              </div>
              </div>
            </div>
          ):(
            <div className="">
            <h1 className="text-3xl font-bold text-white">
              {collection.name}
              <Link className="font-bold text-white pl-3">
                <AiOutlineShareAlt className="inline-block " />
              </Link>
            </h1>
            <p className="text-gray-400">
              Owner:{" "}
              <span className="text-white">
              <Link to={`/account/profile-for/${collection.userId}`} className="text-white font-bold">
                {collection.username}
                </Link>
              </span>
            </p>
            <h2 className="text-gray-400">
              Category:{" "}
              <span className="text-white font-bold">
                {collection.category_name}
              </span>
            </h2>
            <div class=" lg:flex lg:justify-start  space-y-1 lg:space-y-0 pt-1">
              <div className="mr-4 text-gray-400">
                Items :{" "}
                <span className="text-white font-bold">
                  {collection.number_of_arts}
                </span>
              </div>
              <div className="mr-4 text-gray-400">
                Created :{" "}
                <span className="text-white font-bold">
                  {formatTimestamp(collection.createdAt)}{" "}
                </span>
              </div>
            </div>

            <p className="mt-4 text-gray-400"> Description </p>
            <p className="text-white ">{collection.description}</p>
          </div>
          )}
          </div>

          <div className="lg:flex pt-5">
            <div className=" sm:block">
              {/* <Filters  collection={collection} /> */}
              <div className="flex-none bg-gray-900 p-4 lg:w-64 sticky top-0 rounded-lg ">
                <h2 className="text-white text-lg font-bold">Filter Art </h2>
                {selectedFilters.length > 0 && (
                  <div className="text-white mb-4">
                    <h2 className="text-xl font-bold mb-2">
                      Selected Filters:
                    </h2>
                    <ul className="flex flex-wrap">
                      {selectedFilters.map((filter, index) => (
                        <li
                          key={index}
                          className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2"
                        >
                          {filter}
                        </li>
                      ))}
                  <span className="material-symbols-outlined text-red-500 cursor-pointer " onClick={clearFilters}> close</span>
                    </ul>
                      
                  </div>
                )}

                <div className="relative mb-4">
                  <button
                    className="px-4 py-2 bg-gray-800 text-white rounded-md w-48"
                    onClick={handlePriceDropdownToggle}
                  >
                    Price
                  </button>
                  {isPriceDropdownOpen && (
                    <div className="relative mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md">
                      <ul>
                        <li
                          className="px-4 py-2 text-white cursor-pointer"
                          onSubmit={() =>
                            handleCurrencySelect("Kenyan Shilling (KES)")
                          }
                        >
                          <input
                            type="number"
                            placeholder="Max Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="px-2 py-1 rounded-md bg-gray-700 text-white w-40"
                          />
                        </li>
                      </ul>
                      <button
                        className="px-4 py-2 m-1 bg-blue-500 text-white rounded-md mt-2 items-center flex justify-center"
                        onClick={() =>
                          handleCurrencySelect("Kenyan Shilling (KES)")
                        }
                        type="submit"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative mb-4">
                  <button
                    className="px-4 py-2 bg-gray-800 text-white rounded-md w-48"
                    onClick={handleSizeDropdownToggle}
                  >
                    Size
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
                    Medium
                  </button>
                  {isMediumDropdownOpen && (
                    <div className="relative mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md">

                      <ul >
                      { medium && medium.map((mediums)=>(
                        <li
                          className="px-4 py-2 text-white cursor-pointer"
                          key={mediums.id}
                          onClick={() => handleMediumSelect(mediums.name)}
                        >
                          {mediums.name}
                        </li>

                        
               
                      ))
                    }
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
            </div>
            <div className="relative p-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-3 lg:gap-3">
                {collection.artworks &&
                  collection.artworks.map((product) => (
                    <div
                      key={product.id}
                      class="group border-gray-100/30 mx-2 lg:mx-3 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-gray-700 shadow-md"
                    >
                      <Link
                        to={`/single-art/${product.id}`}
                        class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                      >
                        <img
                          class="peer absolute top-0 right-0 h-full w-full object-cover"
                          src={product.image}
                          alt="product image"
                        />
                      </Link>
                      <div class="mt-4 px-5 pb-5">
                        <div className="flex gap-3">
                          <h5 class="text-lg  lg:text-md tracking-tight text-white">
                            {product.name}
                          </h5>
                          <p className="text-gray-400 text-sm">
                            {product.likes?.length}
                          </p>
                        {user? (
                             <button
                             class="text-sm text-gray-400 hover:text-gray-300"
                             onClick={() => handleLike(product.id)} // Pass the artwork id to handleLike
                           >
                             <AiFillHeart
                               className={`text-red-500 text-lg ml-2 cursor-pointer ${
                                 isLiked[product.id] ? "text-red-500" : ""
                               }`}
                             />
                           </button>
                        ): null}
                        </div>
                        <div class="mt-1 flex items-center justify-between">
                          <p>
                            <span class="text-sm  lg:text-lg font-bold text-white">
                              Ksh {product.price}
                            </span>
                          </p>
                        </div>
                        <div class="flex items-center justify-between pt-1">
                          <Link
                            to={`/single-art/${product.id}`}
                            class="text-sm py-2 lg:py-1 px-2 lg:mr-2 rounded-lg border hover:border-slate-900 hover:bg-slate-900 lg:text-lg font-bold text-white mb-2 lg:mb-0"
                          >
                            More
                          </Link>
                          {/* {checkIfAdded(product) ? (
                            <button
                              onClick={() => removeFromCart(product.id)}
                              class="flex items-center rounded-md bg-slate-500 py-2 px-1 text-center text-sm font-medium text-white"
                            >
                              Remove from cart
                            </button>
                          ) : (
                            <button
                              onClick={() => addToCart(product)}
                              class="flex items-center rounded-md bg-slate-900 py-2 px-2 text-center text-sm font-medium text-white"
                            >
                              Add to cart
                            </button>
                          )} */}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCollection;
