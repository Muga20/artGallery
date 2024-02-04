import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import { api } from "../../middleware/Api";

function CreateMedium() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
 const handleSaveToDatabase = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation

    const data = {
      name: name,
    };

    try {
      const res = await api("/medium/create_medium", "post", {}, data);

      setName("");
      setErrors("");
    } catch (error) {
      setErrors(error.message || "An error occurred");
      setSuccessMessage("");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage("Medium created successfully!");
      }, 1000);
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
         <AdminSidebar open={open} setOpen={setOpen} loading={loading} setLoading={setLoading}/>
        </div>

        <div
          className={`relative lg:block navbar-menu ${
            open ? "lg:ml-[280px]" : "lg:ml-0"
          }`}
        >
        
        <AdminNavbar open={open} setOpen={setOpen} loading={loading} setLoading={setLoading}/>

          <section className="bg-gray-100 dark:bg-gray-800"> 

         

          <section className="px-6 py-6 mx-auto">
          <h2 className="text-xl pb-2 font-bold dark:text-gray-400">
              Create New Medium
            </h2>

            <div className="grid lg:grid-cols-[100%,1fr]  grid-cols-1 gap-6 ">
              <div className="pt-4 rounded shadow dark:text-gray-100 dark:bg-gray-900">
                
                <form onSubmit={handleSaveToDatabase}>
                  <div class="w-full rounded-xl p-5 shadow-white/40">
                    {isLoading && (
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white border-opacity-50"></div>
                      </div>
                    )}
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
                    <h2 className="text-base font-semibold leading-7 text-white bt-2">
                      Required field
                    </h2>

                    <div class="mb-4 flex flex-col">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="CreateMedium-name"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Name of your Medium <span className="text-rose-700">*</span>
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              autoComplete="name"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                              placeholder=""
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mb-4 flex flex-col">
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                      <Link to='/admin/medium'>
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-white"
                      >
                       cancel
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
                  </div>
                </form>
              </div>
            </div>
          </section>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CreateMedium;

