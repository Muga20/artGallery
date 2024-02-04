import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import { api } from "../../middleware/Api";

function AdminTags() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await api(`/tags/get_all?page=${page}&pageSize=${pageSize}`, "GET", {}, {});
        setTags(response);
      } catch (error) {
        setErrors("Error fetching tags:", error);
      }
    };
    getTags();
  }, [page, pageSize]);


  const handleDeleteTags = async (id) => {
    try {
      const response = await api(`/tags/delete_tags/${id}`, "DELETE", {}, {});

      // Remove the deleted category from the state
      setTags(tags.filter((tags) => tags.id !== id));
      setSuccessMessage("tag deleted")
    } catch (error) {
      setErrors("Error deleting tags:", error);
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


          <p className="flex justify-end px-6 pt-3 mr-0 text-xl font-bold dark:text-gray-400">
            <Link to='/create-tags'><span>Create Tags</span></Link>
          </p>


          {isLoading && (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white border-opacity-50"></div>
                    </div>
                  )}
                  {(errors || successMessage) && (
                    <div
                      className={`p-3 rounded-lg mt-4 ${
                        errors ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"
                      }`}
                    >
                      {errors || successMessage}
                    </div>
          )}


          <section className="px-6 py-6">
            <div className="grid lg:grid-cols-[100%,1fr]  grid-cols-1 gap-6 ">
              <div className="pt-4 bg-white rounded shadow dark:text-gray-100 dark:bg-gray-900">
                <div className="flex px-6 pb-4 border-b dark:border-gray-700">
                  <h2 className="text-xl font-bold dark:text-gray-400">
                    Tags
                  </h2>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="text-xs text-left text-gray-500 dark:text-gray-400">
                        <th className="px-6 pb-3 font-medium">
                         Tag ID
                        </th>
                        <th className="px-6 pb-3 font-medium">Tags </th>
                        <th className="px-6 pb-3 font-medium"> </th>
                      </tr>
                    </thead>
                    <tbody>
                    {tags.map((tags) => (
                      <tr key={tags.id} className="text-xs bg-gray-100 dark:text-gray-400 dark:bg-transparent">
                        <td className="px-6 py-5 font-medium">{tags.id}</td>
                        <td className="px-6 py-5 font-medium ">
                         {tags.name}
                        </td>
                        <td>
                        </td>
                        <td className="px-6 py-5 ">
                        <button  
                           onClick={() => handleDeleteTags(tags.id)}
                            className="px-4 py-2 font-medium text-red-500 border border-red-500 rounded-md  hover:text-white hover:bg-red-500"
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
                <button className="text-white cursor-pointer" onClick={() => setPage(page + 1)} disabled={tags.length < pageSize}>
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

export default AdminTags;