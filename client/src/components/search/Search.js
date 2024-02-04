import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../middleware/Api";
import { ServerUrl } from "../../config/ServerUrl"
import io from "socket.io-client";
function Search() {
  // Initialize state variables.
  const [search, setSearch] = useState(""); // Store the user's search query.
  const [results, setResults] = useState({}); // Store search results.
  const [isLoading, setIsLoading] = useState(false); // Control loading state.
  const navigate = useNavigate(); // Get the navigate function from react-router-dom.


  const [socket, setSocket]=useState(null)
  const newSocket = io(ServerUrl);

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
         if (socket === null) {
        setSocket(newSocket.on("online"));
      } else {
        newSocket.on("offline");
      }
      navigate(`/account/profile-for/${user.id}`);
    } else if (results.artResult?.length > 0) {
      const art = results.artResult[0];
      navigate(`/single-art/${art.id}`);
    }

    // Clear search results after navigation
    setResults({});
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
    <div className="search-bar hidden lg:flex absolute right-1/3 left-1/3 items-center">
      <form className="w-full max-w-lg">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Arts, collections, and accounts"
            value={search}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        {search && (
          <div className="absolute mt-2 bg-white w-full rounded-md border border-gray-300 shadow-lg">
            <div className="">
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
          </div>
        )}
      </form>
    </div>
  );
}

export default Search;
