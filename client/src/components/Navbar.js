import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineBell } from "react-icons/ai";
import Search from "./search/Search";
import { Link, useNavigate } from "react-router-dom";
import { UseCartContext } from "../hooks/UseCartContext";
import { BiUserCircle, BiSolidCollection } from "react-icons/bi";
import { AiFillPicture } from "react-icons/ai";
import { UseAuthContext } from "../hooks/UseAuthContext";
import image_one from "../assets/images/image_one.jpeg";
import { ServerUrl } from "../config/ServerUrl";

import MobileSearch from "./search/MobileSearch";
import { api } from "../middleware/Api";
import setupSocketConnection from "../config/SockectConnection";
import axios from "axios";

export default function Navbar() {
  // Retrieve cart items from the CartContext.
  const { cartItems } = UseCartContext();

  // Retrieve the dispatch function from the AuthContext.
  const { dispatch } = UseAuthContext();
  // Use the useNavigate hook from react-router-dom for navigation.
  const navigate = useNavigate();
  // Retrieve user information from the AuthContext.
  const { user } = UseAuthContext();
  const [key, setKey] = useState(0); // Initialize a state variable for re-rendering
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [apps, setApp] = useState([]);

  const socket = setupSocketConnection();

  const getUsersData = async () => {
    try {
      setLoading(true);

      const response = await api(`/user/get_single_user`, "GET", {}, {});
      setUserData(response.user);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user data:", error);
    }
  };

    
  useEffect(() => {
    const getApp = async () => {
      try {
        const response = await api(`/app/get_all`, "GET", {}, {});
        setApp(response.app);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getApp();
  }, []);

  useEffect(() => {
    const updateProfileOnImageUpdate = (data) => {
      // Handle the "profileImageUpdated" event here
      getUsersData();
    };

    // Listen for the "profileImageUpdated" event and call updateProfileOnImageUpdate function when received
    socket.on("profileImageUpdated", updateProfileOnImageUpdate);

    getUsersData();

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("profileImageUpdated", updateProfileOnImageUpdate);
    };
  }, []);

  // Define navigation links.
  const navigation = [
    { name: "About", href: "/about", current: false },
  ];

  // Utility function for combining CSS classes.
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // Function to log out the user.
  const logout = async () => {
    // Clear the "user" cookie by setting its value to an empty string
    // await axios.post(`${ServerUrl}/auth/logout`)

    await axios.post(`${ServerUrl}/auth/logout`);

    // document.cookie = "// Add HttpOnly and Secure attributes
    dispatch({ type: "LOGOUT" });
  };

  // Function to handle the "Logout" button click.
  const handleClick = () => {
    logout();
    // Clearing the cookies (set it to an empty string and a date in the past)
    document.cookie = "user=; expires= Thu, 01 Jan 2000 00:00:00 UTC; path=/";

    // Redirect the user to the home page after logging out
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50">
      <Disclosure as="nav" className="bg-gray-800 ">
        {({ open }) => (
          <div className="h-20 pt-1">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {/* {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )} */}
                  </Disclosure.Button>
                </div>

                <div className="flex lg:flex-1 items-center justify-center mt-1">
                  {apps.map((app) =>(
                    <>
                      <Link
                        to="/"
                        className="-m-1.5 p-1.5 lg:pl-0 w-full lg:w-auto lg:inline-block pl-12"
                      >
                        <img
                          className="h-10 w-10 rounded-full"
                          src={app.image}
                          alt=""
                        />
                      </Link>

                      <span className="pl-3 font-bold text-gray-200 text-sm sm:text-xl lg:text-lg relative">
                        {app.name}
                        <span className="absolute top-0 right-[-14px] h-8 border-l-2 border-gray-700 font-bold hidden lg:block"></span>
                      </span>
                    </>
                   ))}
                  <div className="flex lg:flex-1 items-center pl-9 hidden lg:block">
                    {/* {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:text-white",
                          "text-base sm:text-lg font-bold mr-4"
                        )}
                      >
                        {item.name}
                      </a>
                    ))} */}
                  </div>
                </div>

                {/* Desktop Search */}
                <Search />

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                  <div className="flex ">
                    {/* Search Button */}
                    <MobileSearch />
                    {/* Cart Button */}
                    {/* <Link to="/cart">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2focus:ring-offset-2 "
                      >
                        <span className="absolute -inset-1.5" />
                        <BsCart4 className="h-6 w-6 mr-2" aria-hidden="true" />
                        <div className="absolute top-0 right-0 -mt-2 mr-2 flex items-center justify-center bg-red-500 rounded-full h-5 w-5 text-white text-sm font-bold">
                          {cartItems.length}
                        </div>
                      </button>
                    </Link> */}
                  </div>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {user ? (
                          loading ? (
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-900 border-opacity-50"></div>
                          ) : (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={userData.image}
                              alt=""
                            />
                          )
                        ) : (
                          <div>
                            <img
                              className="h-10 w-10 rounded-full"
                              src={image_one}
                              alt=""
                            />
                          </div>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {user && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/account/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                <div className="flex gap-2 items-center">
                                  <BiUserCircle className="text-sm" /> Your
                                  Profile
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        )}


                        {user && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/create-collection"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                <div className="flex gap-2 items-center">
                                  <BiSolidCollection className="text-sm" />{" "}
                                  Create Collection
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        )}

                        {user && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/create-art"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                <div className="flex gap-2 items-center">
                                  <AiFillPicture className="text-sm" /> Create
                                  Art
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        )}

                        {user ? (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={handleClick}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Login / Register
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 bg-gray-900">
                {/* {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))} */}
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
