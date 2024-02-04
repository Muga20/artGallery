import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../middleware/Api";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

function MyArts() {
  const [arts, setArts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArt, setSelectedArt] = useState({});
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Utilizes a useEffect hook to fetch arts by a user from an API on component mount and updates the component's state with the retrieved data, 
  //with an empty dependency array indicating this effect runs only once when the component mounts.
  useEffect(() => {
    const getArts = async () => {
      try {
        const response = await api(`/art/get_arts_by_user?page=${page}&pageSize=${pageSize}`, "GET", {}, {});
        setArts(response);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    getArts();
  }, [page, pageSize]);

  //function for deleting art
  const handleDeleteArt = async (id) => {
    try {
      const response = await api(`/art/delete_art/${id}`, "DELETE", {}, {});

      // Remove the deleted category from the state
      setArts(arts.filter((art) => art.id !== id));
    } catch (error) {
      console.error("Error deleting Art:", error);
    }
  };

  const openModal = (art) => {
    setSelectedArt(art);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = (id) => {
    navigate(`/changeOwnership/${id}`);
  };
  

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md lg:text-2xl text-white font-semibold">My Arts </h2>
        <Link
          to="/create-art"
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 lg:py-2 px-1 lg:px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <span className="mr-2">Add Arts</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {arts?.map((arts) => (
          <div key={arts.id} className="rounded-lg shadow-lg bg-white h-auto">
            <Link to={`/single-art/${arts.id}`} data-mdb-ripple="true" data-mdb-ripple-color="light">
              <img
                className="rounded-t-lg object-cover h-48 w-full"
                src={arts.image}
                alt={`Art- ${arts.name}`}
              />
            </Link>
            <div className="rounded-lg p-2">
            <div className="flex justify-between items-center">
                <h5 className="text-gray-900 text-lg font-semibold pt-2 mb-3">
                  {arts.name}
                </h5>
                <button
                   onClick={() => openModal(arts)}
                  className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition duration-300"
                >
                  Sell
                </button>
             </div> 
              <div className="flex justify-between items-center">
                <p className="text-gray-700 font-semibold text-base">
                  Ksh {arts.price}
                </p>
                <Link to={`/edit-art/${arts.id}`}
                  className="text-red-500 hover:text-red-600"
                >
                  <AiOutlineEdit />
                </Link>

                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleDeleteArt(arts.id)}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-around w-40 pt-10">
                <button className="text-white cursor-pointer" onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Previous
                </button>
                <span className="text-white">{page}</span>
                <button className="text-white  cursor-pointer" onClick={() => setPage(page + 1)} disabled={arts.length < pageSize}>
                  Next
                </button>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white p-4 rounded-lg shadow-lg z-10 w-96">
            <p className="text-lg font-semibold mb-4">
              Do You Want To Sell Your Art?
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-white border text-gray-800 hover:bg-gray-300 px-3 py-1 rounded mr-2"
              >
                Cancel
              </button>

             
                <button
                 onClick={(e) => handleClick(selectedArt.id)}
                  className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded"
                >
                 Continue
                </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MyArts;
