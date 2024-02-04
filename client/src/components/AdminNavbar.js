import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import image_one from "../assets/images/image_one.jpeg";
import { BiUserCircle, BiSolidCollection } from "react-icons/bi";
import { AiFillPicture, AiOutlineBell } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { api } from "../middleware/Api";
import setupSocketConnection from "../config/SockectConnection";
import { getAccessTokenFromCookie } from "../config/AccessToken";
import Search from "./search/AdminSearch";


function AdminNavbar({ open, setOpen, loading, setLoading }) {
  const { dispatch } = UseAuthContext();
  const { user } = UseAuthContext();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const socket = setupSocketConnection();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const handleClick = () => {
    logout();
    navigate("/");
  };

  const getUsersData = async () => {
    try {

      const accessToken = getAccessTokenFromCookie();

      setLoading(true);

      const response = await api(
        `/user/get_single_user`,
        "GET",
        {},
        {}
      );
      setUserData(response.user);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user data:", error);
    }
  };

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

  return (
    <section className="sticky top-0 z-40 px-3 py-3 bg-white shadow dark:text-gray-100 dark:bg-gray-900 lg:px-5">
      <nav className="relative">
        <div className="flex items-center justify-between">
          <div x-data="{ open: false }">
            <button
              onClick={() => setOpen(!open)}
              className="px-2 py-3 text-blue-500 bg-blue-100 rounded dark:text-gray-400 dark:bg-gray-800"
            >
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.50002 1.66667H16.5C16.721 1.66667 16.933 1.57887 17.0893 1.42259C17.2456 1.26631 17.3334 1.05435 17.3334 0.833333C17.3334 0.61232 17.2456 0.400358 17.0893 0.244078C16.933 0.0877975 16.721 0 16.5 0H1.50002C1.27901 0 1.06704 0.0877975 0.910765 0.244078C0.754484 0.400358 0.666687 0.61232 0.666687 0.833333C0.666687 1.05435 0.754484 1.26631 0.910765 1.42259C1.06704 1.57887 1.27901 1.66667 1.50002 1.66667V1.66667ZM16.5 8.33333H1.50002C1.27901 8.33333 1.06704 8.42113 0.910765 8.57741C0.754484 8.73369 0.666687 8.94565 0.666687 9.16667C0.666687 9.38768 0.754484 9.59964 0.910765 9.75592C1.06704 9.9122 1.27901 10 1.50002 10H16.5C16.721 10 16.933 9.9122 17.0893 9.75592C17.2456 9.59964 17.3334 9.38768 17.3334 9.16667C17.3334 8.94565 17.2456 8.73369 17.0893 8.57741C16.933 8.42113 16.721 8.33333 16.5 8.33333ZM16.5 4.16667H1.50002C1.27901 4.16667 1.06704 4.25446 0.910765 4.41074C0.754484 4.56702 0.666687 4.77899 0.666687 5C0.666687 5.22101 0.754484 5.43298 0.910765 5.58926C1.06704 5.74554 1.27901 5.83333 1.50002 5.83333H16.5C16.721 5.83333 16.933 5.74554 17.0893 5.58926C17.2456 5.43298 17.3334 5.22101 17.3334 5C17.3334 4.77899 17.2456 4.56702 17.0893 4.41074C16.933 4.25446 16.721 4.16667 16.5 4.16667Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>

          <Search/>

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
                        to="/profile"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        <div className="flex gap-2 items-center">
                          <BiUserCircle className="text-sm" /> Your Profile
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                )}

                {user && (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        <div className="flex gap-2 items-center">
                         Arts Market
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                )}

                {user ? (
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        )}
                        onClick={handleClick}
                      >
                        Sign out
                      </div>
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
      </nav>
    </section>
  );
}

export default AdminNavbar;
