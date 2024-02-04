import React, { useState, useEffect } from "react";
import { MdInsertPhoto } from 'react-icons/md'
import { api } from "../../middleware/Api";
import { Link } from "react-router-dom";

function CreateCollection() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //for selecting image
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage)); // Set the preview image
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  // Uses a useEffect hook to fetch categories and tags from an API on component mount and 
  //updates the component's state with the retrieved data, with an empty dependency array indicating this effect runs only
  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await api(`/art/get_all_data`, "GET", {}, {});
        setCategories(response.categories);
        setTags(response.tags);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    getCollections();
  }, []);

// Handles the process of saving a new collection to a database by sending a POST request with form data, managing loading states, 
//displaying success or error messages, and using a timeout to reset loading and show a success message.
  const handleSaveToDatabase = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("tagId", tagId);

    try {
      const res = await api(
        "/collection/create_collection",
        "post",
        {},
        formData
      );
      setImage(null)
      setPreviewImage(null)
      setDescription("")
      setCategoryId("")
      setTagId("")
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
    <main className="flex flex-col justify-center p-10">
      <h1 className="text-3xl font-bold text-white pb-4">
        Create New Collection
      </h1>

      <div className="w-full rounded-xl bg-white p-5 shadow-white/40">
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-900 border-opacity-50"></div>
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
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          <span className="text-rose-700">*</span> fields
        </h2>

        <div className="mb-4 grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image, Video, Audio, or 3D Model{" "}
              <span className="text-rose-700">*</span>
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
                      onChange={handleImageChange} // Attach the handleImageChange function
                      className="sr-only"
                      
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

        <div className="mb-4 flex flex-col pb-2">
          <div className="sm:col-span-4">
            <label
              htmlFor="category-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title <span className="text-rose-700">*</span>
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
               
                <input
                  type="text"
                  name="name" // Change name attribute to "name"
                  id="category-name"
                  autoComplete="off"
                  value={name} // Bind input value to name state
                  onChange={(e) => setName(e.target.value)} // Update state on change
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                  placeholder=""
                  
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4 pb-2">
            <label
              htmlFor="category-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              category <span className="text-rose-700">*</span>
            </label>
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
              <span className="text-rose-700">*</span> Select a category for
              your Item{" "}
            </span>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <select
                  name="category"
                  id="category"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="sm:col-span-4 pb-2">
            <label
              htmlFor="tags-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tags <span className="text-rose-700">*</span>
            </label>
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
              <span className="text-rose-700">*</span> Select a tag for your
              Item{" "}
            </span>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <select
                  name="tags"
                  id="tags"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                  value={tagId}
                  onChange={(e) => setTagId(e.target.value)}
                  
                >
                  <option value="">Select a tag</option>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col-span-full pt-5">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              About / Description{" "}
              <span className="text-rose-700">Optional</span>
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="description" // Change name attribute to "description"
                rows={3}
                value={description} // Bind input value to description state
                onChange={(e) => setDescription(e.target.value)} // Update state on change
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Write a few sentences about this Item."
                
              />
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-col">
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link to='/'>
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            </Link>
            <button
              type="button" // Change type to "button" here
              onClick={handleSaveToDatabase} // Attach the handleUpload function
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreateCollection;
