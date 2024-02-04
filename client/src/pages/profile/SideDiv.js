import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyCollection from "./sideDiv/MyCollection";
import MyArts from "./sideDiv/MyArts";
import Settings from "./sideDiv/Settings";
import Notification from "./sideDiv/Notification";
import LikedArts from "./sideDiv/LikedArts";
import Stats from "./sideDiv/Stats";
import Category from "./sideDiv/Category";
import Tags from "./sideDiv/Tags";
import Medium from "./sideDiv/Medium";
import AccSettings from "./sideDiv/AccSettings";
import { UseAuthContext } from "../../hooks/UseAuthContext";
import { getUsersData } from "../../config/CheckRoles";
import { ServerUrl } from "../../config/ServerUrl";
import axios from "axios";
import SocialLinks from "./sideDiv/SocialLinks";

function SideDiv() {
  const [activeSection, setActiveSection] = useState("stats");
  const [isActivityDropdownOpen, setActivityDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      const roles = await getUsersData();
      setUserRoles(roles);
    };

    fetchUserRoles(); // Call the function to fetch user roles when the component mounts
  }, []);

  // Check if the user has the "admin" role
  const isAdmin = userRoles.includes("admin");

  const handleActivityDropdownToggle = () => {
    setActivityDropdownOpen(!isActivityDropdownOpen);
  };

  const handleCategoryDropdownToggle = () => {
    setCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const handleSettingsDropdownToggle = () => {
    setSettingsDropdownOpen(!isSettingsDropdownOpen);
  };

  // Defines an object called 'activityButtonContent' with different content labels for activity buttons in a user interface.
  const activityButtonContent = {
    default: "Activity",
    likedArts: "Liked Arts",
    likedCollections: "Liked Collections",
    followedArtists: "Followed Artists",
  };

  // Defines a logout function that removes user data from localStorage and dispatches a "LOGOUT" action, then calls that function and navigates to the root path ("/") when a click event occurs.
  const logout = async () => {
    // Clear the "user" cookie by setting its value to an empty string
    // await axios.post(`${ServerUrl}/auth/logout`)

    await axios.post(`${ServerUrl}/auth/logout`);

    // document.cookie = "// Add HttpOnly and Secure attributes
    dispatch({ type: "LOGOUT" });
  };

  const handleClick = () => {
    logout();
    navigate("/");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  return (
    <div className="flex flex-col lg:flex-row pt-5">
      <div className="p-5 w-full lg:w-64 flex flex-row lg:flex-col lg:sticky lg:top-0 lg:rounded-lg space-x-3 lg:space-x-0 overflow-x-auto scroll-smooth scrollbar-hide">
        <div>
          <button
            className="py-2 px-4 my-2 rounded-lg bg-gray-500 text-white w-full"
            onClick={() => setActiveSection("collection")}
          >
            Collection
          </button>
        </div>

        <div>
          <button
            className="py-2 px-4 my-2 rounded-lg bg-gray-500 text-white w-full"
            onClick={() => setActiveSection("arts")}
          >
            Arts
          </button>
        </div>

        {/* Activity Dropdown */}
        <div className="relative">
          <button
            className={`py-2 px-4 my-2 rounded-lg bg-gray-500 text-white w-full ${
              isActivityDropdownOpen ? "bg-green-500" : ""
            }`}
            onClick={handleActivityDropdownToggle}
          >
            {activityButtonContent[activeSection] ||
              activityButtonContent.default}
            <span className="text-xs">
              {isActivityDropdownOpen ? "▲" : "▼"}
            </span>
          </button>
          {isActivityDropdownOpen && (
            <div className="absolute lg:relative mt-2 bg-gray-800 border border-gray-700 rounded-md">
              <ul>
                <li
                  className={`px-4 py-2 text-white cursor-pointer ${
                    activeSection === "likedArts" ? "bg-green-500" : ""
                  }`}
                  onClick={() => setActiveSection("likedArts")}
                >
                  Liked Arts
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* <div>
          <button
            className="py-2 px-4 my-2 rounded-lg bg-gray-500 text-white w-full"
            onClick={() => setActiveSection("notification")}
          >
            Notification
          </button>
        </div> */}
        <div>
          <button
            className="py-2 px-4 my-2 rounded-lg bg-gray-500 text-white w-full"
            onClick={() => setActiveSection("stats")}
          >
            Stats
          </button>
        </div>

        <div className="relative">
          <button
            className={` py-2 px-4 my-2 rounded-lg bg-gray-500 text-white w-full ${
              isSettingsDropdownOpen ? "bg-green-500" : ""
            }`}
            onClick={handleSettingsDropdownToggle}
          >
            Settings
            <span className="text-xs">
              {isSettingsDropdownOpen ? "▲" : "▼"}
            </span>
          </button>
          {isSettingsDropdownOpen && (
            <div className="absolute lg:relative mt-2 mb-2 bg-gray-800 border border-gray-700 rounded-md">
              <ul>
                <li
                  className="px-4 py-2 text-white cursor-pointer"
                  onClick={() => setActiveSection("socialLinks")}
                >
                  Add Social Links
                </li>
                <li
                  className="px-4 py-2 text-white cursor-pointer"
                  onClick={() => setActiveSection("settings")}
                >
                  Edit Profile
                </li>
                <li
                  className="px-4 py-2 text-white cursor-pointer"
                  onClick={() => setActiveSection("acc_settings")}
                >
                  Account Settings
                </li>
              </ul>
            </div>
          )}
        </div>

        <div>
          {isAdmin && (
            <button
              className="py-1 px-4 my-1 rounded-lg bg-gray-500 text-white w-full"
              onClick={handleAdminClick}
            >
              Admin Dashboard
            </button>
          )}
        </div>

        <div>
          <button
            className="py-2 px-4 my-2 rounded-lg bg-red-500 text-white w-full"
            onClick={handleClick}
          >
            Logout
          </button>
        </div>

        <div className="mt-auto"></div>
      </div>
      <div className="p-5 w-full max-h-screen overflow-y-scroll hide-scrollbar">
        <div className="p-5 w-full">
          <div className=" bg-gray-900 p-4  rounded-lg max-w-full">
            {activeSection === "collection" && <MyCollection />}
            {activeSection === "arts" && <MyArts />}
            {activeSection === "settings" && <Settings />}
            {activeSection === "notification" && <Notification />}
            {activeSection === "likedArts" && <LikedArts />}
            {activeSection === "stats" && <Stats />}
            {activeSection === "category" && <Category />}
            {activeSection === "tags" && <Tags />}
            {activeSection === "medium" && <Medium />}
            {activeSection === "acc_settings" && <AccSettings />}
            {activeSection === "socialLinks" && <SocialLinks />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideDiv;
