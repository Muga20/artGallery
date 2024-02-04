import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../middleware/Api";

function MobileSearch() {
  // Initialize state variables.
  const [showSearchInput, setShowSearchInput] = useState(false); // Control the visibility of the search input.
  const [search, setSearch] = useState(""); // Store the user's search query.
  const [results, setResults] = useState({}); // Store search results.
  const [isLoading, setIsLoading] = useState(false); // Control loading state.
  const navigate = useNavigate(); // Get the navigate function from react-router-dom.

  // Function to toggle the visibility of the search input.
  const handleSearchIconClick = () => {
    setShowSearchInput(!showSearchInput);
  };

  // Function to update the 'search' state when the user types in the input.
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // Function to handle search when the user presses the Enter key.
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // Function to handle search and navigate based on search results.
  const handleSearch = () => {
    if (results.collectionResult?.length > 0) {
      const collection = results.collectionResult[0];
      navigate(`/single-collection/${collection.id}`);
    } else if (results.userResult?.length > 0) {
      const user = results.userResult[0];
      navigate(`/account/profile-for/${user.id}`);
    } else if (results.artResult?.length > 0) {
      const art = results.artResult[0];
      navigate(`/single-art/${art.id}`);
    }
  };

  // Function to fetch search results from the server.
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simulate a delay of 1 second (you can replace this with an actual API request).
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Make an API request to fetch search results based on the user's query.
      const response = await api(`/index/search/${search}`, "GET", {}, {});

      // Set the search results in the state.
      setResults(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use useEffect to trigger search when the user types at least 2 characters.
  useEffect(() => {
    if (search.length >= 2) {
      fetchData();
    } else {
      setResults({});
    }
  }, [search]);

  return (
    <div>
      <button
        type="button"
        onClick={handleSearchIconClick}
        className="lg:hidden relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none "
      >
        <span className="absolute -inset-1.5" />
        <div className="flex">
          {showSearchInput ? (
            <AiOutlineClose className="h-8 w-8 mr-2" aria-hidden="true" />
          ) : (
            <AiOutlineSearch className="h-8 w-8 mr-2" aria-hidden="true" />
          )}
        </div>
      </button>

      {showSearchInput && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 p-2 rounded-md shadow-md  w-full">
          <div className="relative w-full">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for Arts, collections, and accounts"
                  required
                  value={search}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button
                type="submit"
                class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </form>
          </div>

          <div className="">
            {search && (
              <div className="absolute mt-2 bg-white min-w-full	rounded-md border border-gray-300 shadow-lg ">
                {isLoading ? (
                  <div className="p-2">
                    <i className=""></i> Loading...
                  </div>
                ) : (
                  search.length >= 2 && (
                    <div>
                      {Array.isArray(results.collectionResult) &&
                        results.collectionResult.length > 0 && (
                          <div>
                            <span className="block p-2 bg-gray-200">
                              Collections
                            </span>
                            {results.collectionResult.map((result, index) => (
                              <div
                                key={index}
                                className="p-2 border-b border-gray-300 flex items-center"
                              >
                                <img
                                  src={result.image}
                                  className="w-12 h-12 rounded-full"
                                  alt=""
                                />
                                <div className="ml-2 text-lg">
                                  <Link
                                    to={`/single-collection/${result.id}`}
                                    className=""
                                  >
                                    {result.name}
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                      {Array.isArray(results.userResult) &&
                        results.userResult.length > 0 && (
                          <div>
                            <span className="block p-2 bg-gray-200">Users</span>
                            {results.userResult.map((result, index) => (
                              <div
                                key={index}
                                className="p-2 border-b border-gray-300 flex items-center"
                              >
                                <img
                                  src={result.image}
                                  className="w-12 h-12 rounded-full"
                                  alt=""
                                />
                                <div className="ml-2 text-lg">
                                  <Link
                                    to={`/profile-for/${result.id}`}
                                    className=""
                                  >
                                    {result.username}
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                      {Array.isArray(results.artResult) &&
                        results.artResult.length > 0 && (
                          <div>
                            <span className="block p-2 bg-gray-200">Arts</span>
                            {results.artResult.map((result, index) => (
                              <div
                                key={index}
                                className="p-2 border-b border-gray-300 flex items-center"
                              >
                                <img
                                  src={result.image}
                                  className="w-12 h-12 rounded-full"
                                  alt=""
                                />
                                <div className="ml-2 text-lg">
                                  {result.name && (
                                    <Link
                                      to={`/single-art/${result.id}`}
                                      className=""
                                    >
                                      {result.name}
                                    </Link>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileSearch;
