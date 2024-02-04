import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import { api } from "../../middleware/Api";

function Category() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);


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
        const getCategories = async () => {
          try {
            const response = await api(`/category/get-admin_categories?page=${page}&pageSize=${pageSize}`, 'GET', {}, {});
            setCategories(response.categories);
          } catch (error) {
            setErrors('Error fetching categories:' ,error);
          }
        };

        getCategories();
      }, [page, pageSize]);

    //function for deleting category
    const handleDeleteCategory = async (id) => {
      try {
        const response = await api(
          `/category/delete_categories/${id}`,
          "DELETE",
          {},
          {}
        );
    

        // Remove the deleted category from the state
        setCategories(categories.filter((category) => category.id !== id));
        setSuccessMessage("Category deleted")
      } catch (error) {
        setErrors("Error deleting category:", error);
      }
    };



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
            <Link to='/create-category'><span>Create Category</span></Link>
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
                    Transaction
                  </h2>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="text-xs text-left text-gray-500 dark:text-gray-400">
                        <th className="px-6 pb-3 font-medium">
                          Category ID
                        </th>
                        <th className="px-6 pb-3 font-medium ">Image</th>
                        <th className="px-6 pb-3 font-medium ">Category </th>
                        <th className="px-6 pb-3 font-medium">Status </th>
                        <th className="px-6 pb-3 font-medium"> </th>
                      </tr>
                    </thead>
                    <tbody>
                    {categories.map((category) => (
                      <tr key={category.id} className="text-xs bg-gray-100 dark:text-gray-400 dark:bg-transparent">
                        <td className="px-6 py-5 font-medium">{category.id}</td>
                        <td className="px-6 py-5 font-medium">  
                         <img
                              src={category.image}
                              alt={category.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                      </td>
                        <td className="px-6 py-5 font-medium ">
                        {category.name}
                        </td>
                  
                        <td className="px-6 py-5 ">
                        <button
                           onClick={() => handleDeleteCategory(category.id)}
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
                <button className="text-white  cursor-pointer" onClick={() => setPage(page + 1)} disabled={categories.length < pageSize}>
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

export default Category;
