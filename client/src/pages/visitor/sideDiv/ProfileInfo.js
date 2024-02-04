import React, { useState, useEffect, useRef } from "react";
import { GoVerified } from "react-icons/go";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiUser } from "react-icons/hi";

import {
  AiOutlineTwitter,
  AiOutlineReddit,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { BiLogoPinterest } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { Link, useParams, useHistory } from "react-router-dom";
import { api } from "../../../middleware/Api";
import setupSocketConnection from '../../../config/SockectConnection';
import { ServerUrl } from "../../../config/ServerUrl";
import io from "socket.io-client";



function ProfileInfo() {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [isOnline, setIsOnline] = useState([]);
  // const socket = setupSocketConnection();
  const [socket, setSocket] = useState(null);
  const newSocket = io(ServerUrl);

  // Sets up a useEffect hook to fetch user data from an API when the 'id' dependency changes, updating the component's state with the retrieved data.
  useEffect(() => {
    const getUsersData = async () => {
      try {
        const response = await api(
          `/user/get_visited_user/${id}`,
          "GET",
          {},
          {}
        );
        setUser(response.user);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    getUsersData();
  }, [id]); // Include hasReloaded as a dependency

  // Formats a timestamp into a human-readable date string, or returns "Invalid Date" if the timestamp is not valid.
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    if (isNaN(date)) {
      return "Invalid Date";
    }

    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleString(undefined, options);
  };

  
  useEffect(() => {
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user])

  
  useEffect(() => {
    if (socket === null ) return; // if the socket is null we return so not invoke the function
    // Listen for incoming messages from server
    socket.emit("online", user?.id);
    socket.on("getOnlineUsers", (res)=>{
      setIsOnline(res)
    })
  }, [socket]);

  return (
    <div>
      <div className="bg-gray-900 h-40 relative group">
        <img
          src={user.cover_photo}
          alt="Banner Image"
          className="h-48 lg:h-80 w-full object-cover"
        />
      </div>

      <div className="relative flex items-center p-4 mt-0 lg:mt-20">
        <div>
          <div className="relative">
            <img
              src={user.image}
              alt="Profile Image"
              className="h-40 w-40 rounded-full object-cover mr-4"
            />
          </div>
        </div>
        <div>
          <h1 className="text-lg pt-10 text-white font-semibold">
            {user.first_name} {user.last_name}
          </h1>
          <div className="flex gap-1"></div>
          <div className="flex gap-1">
              {isOnline?.some((users) => users?.id === user?.id) ? (
              
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

      <div className="p-5">
        <div className="bg-gray-900 p-5 rounded-lg">
          <div className="flex p-2 gap-2">
            <div>
              <h2 className="text-lg text-white font-semibold">
                Member Since: {formatTimestamp(user.createdAt)}
              </h2>
            </div>
          </div>

          <div className="p-2">
            <h2 className="text-lg text-white font-semibold flex">
              username : {user.username}
            </h2>
          </div>

          <div className="p-2">
            <h2 className="text-lg text-white font-semibold flex">
              <MdLocationPin /> {user.city}
            </h2>
          </div>

          <div className="p-2">
            <ul className="flex  gap-3 ">
              <li>
                <Link to="https://twitter.com">
                  <AiOutlineTwitter className="text-blue-400 text-lg lg:text-3xl" />
                </Link>
              </li>
              <li>
                <Link to="https://reddit.com">
                  <AiOutlineReddit className="text-orange-500 text-lg lg:text-3xl" />
                </Link>
              </li>
              <li>
                <Link to="https://facebook.com">
                  <FaFacebook className="text-blue-600 text-lg lg:text-3xl" />
                </Link>
              </li>
              <li>
                <Link to="https://pinterest.com">
                  <BiLogoPinterest className="text-red-600 text-lg lg:text-3xl" />
                </Link>
              </li>
              <li>
                <Link to="https://instagram.com">
                  <AiFillInstagram className="text-pink-600 text-lg lg:text-3xl" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h2 className="text-lg text-white font-semibold">About Me</h2>
            <p className="text-gray-600 text-md">{user.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
