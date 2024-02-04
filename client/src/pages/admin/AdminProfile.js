import React, { useState, useEffect, useRef } from "react";
import { GoVerified } from "react-icons/go";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiUser } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { api } from "../../middleware/Api";
import ProfilePicture from "./ProfilePicture"
import {
  AiOutlineTwitter,
  AiOutlineReddit,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { BiLogoPinterest } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import setupSocketConnection from '../../config/SockectConnection';
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import { getAccessTokenFromCookie } from "../../config/AccessToken";


function AdminProfile() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [tempCoverImageFile, setTempCoverImageFile] = useState(null);
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const fileInputRef = useRef(null);
  const socket = setupSocketConnection();

  // Define a variable for caching
  let cachedUserData = null;

  // Add the debounce function implementation here
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  // Defines an async function 'getUsersData' to fetch user data from an API, with the option to cache the data to avoid unnecessary requests,
  //and updates the component's state with the fetched data while managing loading and error states.
  const getUsersData = async () => {
    try {
      setLoading(true);

      // Check if user data is cached
      if (cachedUserData) {
        setUserData(cachedUserData.user);
        setUserRoles(cachedUserData.roleNames);
        setLoading(false);
        return;
      }

      const accessToken = getAccessTokenFromCookie();

      const response = await api(
        `/user/get_single_user`,
        "GET",
        {},
        {}
      );

      setUserData(response.user);
      setUserRoles(response.roleNames);

      // Cache the response
      cachedUserData = { user: response.user, roleNames: response.roleNames };

      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Error fetching collections:", error);
    }
  };

  const debouncedGetUsersData = debounce(getUsersData, 300); // Debounce the function

  useEffect(() => {
    debouncedGetUsersData();
  }, [tempCoverImageFile]);

  //function that checks date
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    if (isNaN(date)) {
      return "Invalid Date";
    }

    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleString(undefined, options);
  };

  //edit image
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  //cancel from editing
  const handleCancelClick = () => {
    setIsEditing(false);
    setTempCoverImageFile(null);
  };

  //function that enable to change image
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTempCoverImageFile(file);
      setIsEditing(true);
    }
  };

  //function for saving image
  const handleImageSave = async () => {
    try {
      const formData = new FormData();
      formData.append("image", tempCoverImageFile);

      const response = await api(
        "/user/replace_cover_image",
        "patch",
        {},
        formData
      );

      if (response) {
        setSuccessMessage("Profile image updated successfully");
        setErrors("");

        setIsEditing(false);
        setTempCoverImageFile(null);

        // Trigger a reload of user data after the cover photo is changed
        getUsersData();
      } else {
        setErrors("An error occurred");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrors(error.message || "An error occurred");
      setSuccessMessage("");
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    // Simulate a loading delay for demonstration purposes
    const loadingTimeout = setTimeout(() => {
      setImageLoaded(true);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(loadingTimeout);
  }, []); // This effect runs only once when the component mounts


  useEffect(() => {
    socket.on('userStatus', (status) => {
      setIsOnline(status);
    });

    return () => {
      socket.off('userStatus');
    };
  }, [socket]); // Add socket to the dependency array to handle reconnections


  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js";
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      // Clean up: Remove the script from the DOM when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-gray-100 xl:h-screen dark:bg-gray-800">
      <div className="body-content" x-data="{ open: true }">
      <div className="relative lg:block navbar-menu">
         <AdminSidebar open={open} setOpen={setOpen} loading={loading} setLoading={setLoading}/>
        </div>

        <div
          className={`relative lg:block navbar-menu ${
            open ? "lg:ml-[280px]" : "lg:ml-0"
          }`}
        >
        
        <AdminNavbar open={open} setOpen={setOpen} loading={loading} setLoading={setLoading}/>

          <section className="bg-gray-100 dark:bg-gray-800">
          <div>
          <div className="bg-gray-900 h-40 relative group">
        {!imageLoaded && (
          <div className="h-80 w-full object-cover">
            {/* Placeholder cards with flashing animation */}
            {Array.from({ length: 1 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md h-48 animate-pulse"c
              ></div>
            ))}
          </div>
        )}
        <img
          src={
            isEditing
              ? URL.createObjectURL(tempCoverImageFile)
              : userData.cover_photo
          }
          loading="lazy"
          alt="Banner Image"
          className={`h-80 w-full object-cover ${
            isEditing ? "opacity-500 transition-opacity duration-500" : ""
          } ${!imageLoaded ? "hidden" : ""}`}
          onLoad={handleImageLoad}
        />

        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isEditing ? "bg-blue-500" : "bg-gray-900 bg-opacity-50"
          } rounded-full p-4 cursor-pointer`}
        >
          {isEditing ? (
            <div>
              <button
                onClick={handleImageSave}
                className="text-white text-base mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="text-white text-base"
              >
                Cancel
              </button>
            </div>
          ) : (
            <AiFillEdit
              className="text-white text-2xl"
              onClick={handleEditClick}
            />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>   

    <div className="relative flex items-center p-4 mt-20">
        <ProfilePicture />
        <div>
          <h1 className="text-2xl pt-10 text-white font-semibold">
            {userData.first_name} {userData.last_name}
          </h1>
          <div className="flex gap-1">
            <div className="flex gap-1">
              {userRoles.map((role) => {
                if (role === "admin") {
                  return (
                    <MdOutlineAdminPanelSettings
                      key={role}
                      className="text-2xl text-white font-semibold"
                    />
                  );
                } else if (role === "user") {
                  return (
                    <HiUser
                      key={role}
                      className="text-2xl text-white font-semibold"
                    />
                  );
                } else if (role === "verified") {
                  return (
                    <GoVerified
                      key={role}
                      className="text-2xl text-white font-semibold"
                    />
                  );
                }

                return null;
              })}
            </div>
            <div className="flex gap-1">
              {isOnline ? (
                <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                  <span class="flex w-2.5 h-2.5 bg-green-600 rounded-full mr-1.5 flex-shrink-0"></span>
                  <span className="text-green-600">online</span>
                </span>
              ) : (
                <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                  <span class="flex w-2.5 h-2.5 bg-red-600 rounded-full mr-1.5 flex-shrink-0"></span>
                  <span className="text-red-600">offline</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>  

      <div className="p-5">
        <div className="bg-gray-900 p-5 rounded-lg">
          <div className="flex p-2 gap-2">
            <div>
            <h2 className="text-lg text-white font-semibold flex">
              name {userData.first_name}  {userData.last_name}
            </h2>
            </div>
          </div>

          <div className="p-2">
            <h2 className="text-lg text-white font-semibold flex">
              username {userData.username}
            </h2>
          </div>

          <div className="p-2">
            <h2 className="text-lg text-white font-semibold flex">
              <MdLocationPin /> {userData.city}
            </h2>
          </div>

          <div className="p-2">
            <ul className="flex  gap-3 ">
              <li>
                <Link to="https://twitter.com">
                  <AiOutlineTwitter className="text-blue-400 text-3xl" />
                </Link>
              </li>
              <li>
                <Link to="https://reddit.com">
                  <AiOutlineReddit className="text-orange-500 text-3xl" />
                </Link>
              </li>
              <li>
                <Link to="https://facebook.com">
                  <FaFacebook className="text-blue-600 text-3xl" />
                </Link>
              </li>
              <li>
                <Link to="https://pinterest.com">
                  <BiLogoPinterest className="text-red-600 text-3xl" />
                </Link>
              </li>
              <li>
                <Link to="https://instagram.com">
                  <AiFillInstagram className="text-pink-600 text-3xl" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h2 className="text-lg text-white font-semibold">About Me</h2>
            <p className="text-gray-600">{userData.bio}</p>
          </div>
        </div>
      </div>
   </section>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
