import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import { api } from "../../middleware/Api";

function CheckRoles() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await api(`/auth/get-roles?page=${page}&pageSize=${pageSize}`, "GET", {}, {});
        setRoles(response.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    getRoles();
  }, [page, pageSize]);

  //function for deleting medium
  const handleDeleteRoles = async (id) => {
    try {
      const response = await api(`/auth/delete_roles/${id}`, "DELETE", {}, {});

      // Remove the deleted category from the state
      setRoles(roles.filter((role) => role.id !== id));
    } catch (error) {
      console.error("Error deleting roles:", error);
    }
  };

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
            <p className="flex items-center justify-between px-6 pt-3 mr-0 text-xl font-bold dark:text-gray-400">
            
                <Link to="/admin/create-roles-permissions">
                  <span>Create New Role </span>
                </Link>
           
                <Link to="/admin/create-user-roles">
                  <span>Give User a role </span>
                </Link>
             
            </p>

            <section className="px-6 py-6">
              <div className="grid lg:grid-cols-[100%,1fr]  grid-cols-1 gap-6 ">
                <div className="pt-4 bg-white rounded shadow dark:text-gray-100 dark:bg-gray-900">
                  <div className="flex px-6 pb-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold dark:text-gray-400">
                      Available Roles
                    </h2>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="text-xs text-left text-gray-500 dark:text-gray-400">
                          <th className="px-6 pb-3 font-medium">Role ID</th>
                          <th className="px-6 pb-3 font-medium ">Role Name </th>
                          <th className="px-6 pb-3 font-medium ">
                            Role Number{" "}
                          </th>
                          <th className="px-6 pb-3 font-medium"> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.map((role) => (
                          <tr
                            key={role.id}
                            className="text-xs bg-gray-100 dark:text-gray-400 dark:bg-transparent"
                          >
                            <td className="px-6 py-5 font-medium">{role.id}</td>
                            <td className="px-6 py-5 font-medium ">
                              {role.role}
                            </td>

                            <td className="px-6 py-5 font-medium ">
                              {role.role_number}
                            </td>

                            <td className="px-6 py-5 ">
                              <button
                                onClick={() => handleDeleteRoles(role.id)}
                                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="flex justify-around w-40 pt-10">
                <button className="text-white cursor-pointer" onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Previous
                </button>
                <span className="text-white">{page}</span>
                <button className="text-white cursor-pointer" onClick={() => setPage(page + 1)} disabled={roles.length < pageSize}>
                  Next
                </button>
              </div>

            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
export default CheckRoles;
