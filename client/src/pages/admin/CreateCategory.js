import React, { useState, useEffect } from "react";
import { MdInsertPhoto } from 'react-icons/md'
import { api } from "../../middleware/Api";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import { Link } from "react-router-dom";

function CreateCategory() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // Holds the uploaded file
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  //function for selecting image
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage)); // Set the preview image
  };

;

  // Handles the process of saving a new collection to a database by sending a POST request with form data, managing loading states,
  // displaying success or error messages, and using a timeout to reset loading and show a success message.
  const handleSaveToDatabase = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);

    try {
      const res = await api(
        "/category/create_category",
        "post",
        {},
        formData
      );
      setName("")
      setImage(null)
      setPreviewImage(null)
      setErrors("");
    } catch (error) {
      setErrors(error.message || "An error occurred");
      setSuccessMessage("");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage("Collection created successfully!");
      }, 1000);
    }
  };

  return (
    <div className="bg-gray-100  h-screen dark:bg-gray-800">
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

          <section className="px-6 py-6  mx-auto">
          <h2 className="text-xl pb-2 font-bold dark:text-gray-400">
              Create New Category
            </h2>

            <div className="grid lg:grid-cols-[100%,1fr]  grid-cols-1 gap-6 ">
            <div className="pt-4 rounded shadow dark:text-gray-100 dark:bg-gray-900">
                
              <form class="w-full rounded-xl p-5 shadow-white/40">
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
                  <h2 className="text-base font-semibold leading-7 text-white">
                    <span className="text-rose-700">*</span> fields
                  </h2>

                  <div class="mb-4 grid grid-cols-1 gap-4">
                    <div class="flex flex-col">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Image, Video, Audio, or 3D Model{" "}
                        <span className="text-rose-700">*</span>
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white px-6 py-10">
                        <div className="text-center">
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Selected"
                              className="mx-auto h-32 w-32 object-cover"
                            />
                          ) : (
                            <MdInsertPhoto
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                          )}
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleImageChange}
                                
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mb-4 flex flex-col">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="category-name"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Name of your Category <span className="text-rose-700">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={name} // Bind input value to name state
                            onChange={(e) => setName(e.target.value)} // Set name state every time input changes
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
                    <Link to='/admin/category'>
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-white"
                      >
                       cancel
                      </button>
                      </Link>
                      <button
                        type="submit"
                        onClick={handleSaveToDatabase}
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
  );
}

export default CreateCategory;
