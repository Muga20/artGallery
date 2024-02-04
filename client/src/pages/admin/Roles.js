import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import { api } from "../../middleware/Api";

// Assuming you're using reach/router for navigation

function Roles() {
  const [open, setOpen] = useState(true);
  const [RoleName, setName] = useState("");
  const [RoleNumber, setNumber] = useState("");
  const [roles, setRoles] = useState([]);
  const [username, setUserName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [loading, setLoading] = useState(false);

  // State for create_roles function
  const [createRolesErrors, setCreateRolesErrors] = useState("");
  const [createRolesSuccessMessage, setCreateRolesSuccessMessage] =
    useState("");
  const [createRolesLoading, setCreateRolesLoading] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // Function for creating roles
  const create_roles = async (e) => {
    e.preventDefault();

    try {
      const data = {
        RoleName: RoleName,
        RoleNumber: RoleNumber,
      };

      setCreateRolesLoading(true);

      const response = await api(`/auth/create-role`, "POST", {}, data);

      setCreateRolesSuccessMessage("Role created successfully!");

   

      setCreateRolesErrors("");
    } catch (error) {
      setCreateRolesErrors(error.message || "An error occurred");
      setCreateRolesSuccessMessage("");
    } finally {
      setCreateRolesLoading(false);
    }
  };



  return (
    <div>
      <div className="bg-gray-100 xl:h-screen dark:bg-gray-800">
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
              <section className="px-6 py-6 h-[100vh] mx-auto">
                <h2 className="text-xl font-bold dark:text-gray-400">
                  Create Roles
                </h2>

                <div className="grid lg:grid-cols-[100%,1fr]  grid-cols-1 gap-6 ">
                  <div className="pt-4 rounded shadow dark:text-gray-100 dark:bg-gray-900">
                    <form
                      onSubmit={create_roles}
                      class="w-full rounded-xl  p-5 shadow-white/40"
                    >
                      {createRolesLoading && (
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white border-opacity-50"></div>
                        </div>
                      )}
                      {createRolesErrors && (
                        <div
                          className={`p-3 rounded-lg mt-4 text-red-500 bg-red-100`}
                        >
                          {createRolesErrors}
                        </div>
                      )}
                      {createRolesSuccessMessage && (
                        <div
                          className={`p-3 rounded-lg mt-4 text-green-500 bg-green-100`}
                        >
                          {createRolesSuccessMessage}
                        </div>
                      )}

                      <h2 className="text-base font-semibold leading-7 text-white">
                        <span className="text-rose-700">*</span>Required fields
                      </h2>

                      <div class="mb-4 flex flex-col ">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="category-name"
                            className="block text-sm font-medium leading-6 text-white"
                          >
                            Roles <span className="text-rose-700">*</span>
                          </label>
                          <div className="mt-2">
                            Roles Name <span className="text-rose-700">*</span>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                value={RoleName}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                                placeholder=""
                              />
                            </div>
                          </div>

                          <div className="mt-2">
                            Roles Number{" "}
                            <span className="text-rose-700">*</span>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                value={RoleNumber}
                                onChange={(e) => setNumber(e.target.value)}
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                                placeholder=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="mb-4 flex flex-col">
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Link to="/admin/roles-permissions" >
                          <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-white"
                          >
                            Cancel
                          </button>
                        </Link>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

             
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roles;
