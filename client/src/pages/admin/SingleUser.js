import { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import { api } from "../../middleware/Api";
import axios from "axios";

function SingleUser() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUsers] = useState({});
  const {id} =useParams()
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
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

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api(`/user/get_users_by_id/${id}`, "GET", {}, {});
        setUsers(response.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUsers();
  }, []);

  //function for deleting medium
  const handleActivateUser = async (id) => {
    try {
      const response = await api(`/user/Active/${id}`, "PATCH", {
        isActive: "1",
      });
      if (response.success) {
        setUsers({ ...user, isActive: "Active" });

      } else {
        setErrors("Failed to Activate User");
      }
    } catch (error) {
      setErrors("Error:", error);
    }
  };

  const handleInActivateUser = async (id) => {
    try {
      const response = await api(`/user/Deactivate/${id}`, "PATCH", {
        isActive: "0",
      });
      if (response.success) {
        setUsers({ ...user, isActive: "Inactive" });

      } else {
       setErrors("Failed to Deactivate User");
      }
    } catch (error) {
     setErrors("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen dark:bg-gray-800">
      <div className="body-content" x-data="{ open: true }">
        <div className="relative lg:block navbar-menu">
          <AdminSidebar
            open={open}
            setOpen={setOpen}
            loading={loading}
            setLoading={setLoading}
          />
        </div>

        <div
          className={`relative lg:block navbar-menu ${
            open ? "lg:ml-[280px]" : "lg:ml-0"
          }`}
        >
          <AdminNavbar
            open={open}
            setOpen={setOpen}
            loading={loading}
            setLoading={setLoading}
          />

          <section className="bg-gray-100 dark:bg-gray-800">
            <section className="px-6 py-6">
              <div className="grid lg:grid-cols-[100%,1fr]  grid-cols-1 gap-6 ">

              {(errors || successMessage) && (
                      <div
                        className={`p-3 mb-5 rounded-lg mt-4 ${
                          errors
                            ? "text-red-500 bg-red-100"
                            : "text-green-500 bg-green-100"
                        }`}
                      >
                        {errors || successMessage}
                      </div>
                )}

                <div className="pt-4 bg-white rounded shadow dark:text-gray-100 dark:bg-gray-900">
                  <div className="flex px-6 pb-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold dark:text-gray-400">
                      Users
                    </h2>
                  </div>
                  <div className="p-4 overflow-x-auto scrollbar-hide">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="text-xs text-left text-gray-500 dark:text-gray-400">
                          <th className="px-6 pb-3 font-medium">User ID</th>
                          <th className="px-6 pb-3 font-medium ">Username </th>
                          <th className="px-6 pb-3 font-medium">first Name </th>
                          <th className="px-6 pb-3 font-medium">Last Name</th>
                          <th className="px-6 pb-3 font-medium">Email </th>
                          <th className="px-6 pb-3 font-medium">Roles </th>
                          <th className="px-6 pb-3 font-medium">Status </th>
                          <th className="px-6 pb-3 font-medium"> </th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr
                            key={id}
                            className="text-xs bg-gray-100 dark:text-gray-400 dark:bg-transparent"
                          >
                            <td className="px-6 py-5 font-medium">{user.id}</td>
                            <td className="px-6 py-5 font-medium ">
                              {user.username}
                            </td>
                            <td className="px-6 py-5 font-medium ">
                              {user.first_name}
                            </td>
                            <td className="px-6 py-5 font-medium ">
                              {user.last_name}
                            </td>
                            <td className="px-6 py-5 font-medium ">
                              {user.email}
                            </td>
                            <td className="px-6 py-5 font-medium ">
                             {user.roles?.map((role, index) => (
                                <span key={index}>
                                  {role.role}
                                  {index !== user.roles.length - 1 ? ', ' : ''} 
                                </span>
                              ))}
                            </td>
                            <td>
                              <span
                                className={`inline-block px-2 py-1 text-center ${
                                  user.isActive
                                    ? "text-green-600 bg-green-100 dark:text-green-700 dark:bg-green-200"
                                    : "text-red-600 bg-red-100 dark:text-red-700 dark:bg-red-200"
                                } rounded-md`}
                              >
                                {user.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td>
                              {user.isActive ? (
                                <button
                                  onClick={() => handleInActivateUser(user.id)}
                                  className="px-4 py-2 font-medium text-blue-500 border  rounded-md border-blue-300 hover:text-blue-100 hover:bg-blue-500"
                                >
                                  Active
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleActivateUser(user.id)}
                                  className="px-4 py-2 font-medium text-red-500 border  rounded-md border-red-300 hover:text-red-100 hover:bg-red-500"
                                >
                                  Inactive
                                </button>
                              )}
                            </td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SingleUser;

