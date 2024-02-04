import React, { useEffect, useState } from "react";
import { MdInsertPhoto } from "react-icons/md";
import { api } from "../../middleware/Api";
import { Link } from "react-router-dom";

function CreateArt() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [collections, setCollections] = useState([]);
  const [price, setPrice] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [mediumId, setMediumId] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExplicit, setIsExplicit] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  // Uses a useEffect hook to fetch categories, tags, mediums, and collections from an API on component mount and 
  //updates the component's state with the retrieved data, with an empty dependency array indicating this effect runs only once when the component mounts.
  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await api(`/art/get_all_data`, "GET", {}, {});

        setCategories(response.categories);
        setTags(response.tags);
        setMediums(response.mediums);
        setCollections(response.collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    getCollections();
  }, []);

  // Handles the submission of a form for creating new artwork by sending a POST request with form data,
  // preventing the default form submission, managing loading states, displaying success or error messages, and clearing previous messages as appropriate.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("categoryId", categoryId);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("mediumId", JSON.stringify(mediumId));
    formData.append("year", year);
    formData.append("image", image);
    formData.append("collectionId", collectionId);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("tagId", tagId);
    formData.append("isExplicit", isExplicit);

    try {
      const response = await api("/art/create_art", "POST", {}, formData);

      setSuccessMessage("Art Created Successfully "); // Set success message on success
      setName("")
      setDescription("")
      setCategoryId("")
      setPrice("")
      setMediumId([]);
      setYear("")
      setImage(null)
      setPreviewImage(null)
      setCollectionId("")
      setWidth("")
      setHeight("")
      setTagId("")
      setIsExplicit("")
      setErrors(""); // Clear any previous errors
    } catch (error) {
      setErrors(error.message || "An error occurred"); // Set the error message
      setSuccessMessage(""); // Clear any previous success message
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage("Collection created successfully!");
      }, 1000);
    }
  };


  // Checks whether a given year is valid by ensuring it's a numeric value between 1995 and the current year.
  const isValidYear = (year) => {
    const currentYear = new Date().getFullYear();
    const enteredYear = parseInt(year, 10); // Parse year as an integer

    return (
      !isNaN(enteredYear) && enteredYear >= 1995 && enteredYear <= currentYear
    );
  };

  // Handles the change of an image input by updating the displayed image and 
  //setting an image preview URL based on the selected image file.
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage)); // Set image preview URL
  };

  return (
    <main className="flex flex-col justify-center p-10">
      <h1 className="text-3xl font-bold text-white pb-4">Create New Art</h1>

      <form onSubmit={handleSubmit}>
        <div className="w-full rounded-xl bg-white p-5 shadow-white/40">
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-900 border-opacity-50"></div>
            </div>
          )}

          {(errors || successMessage) && (
            <div
              className={`p-3 rounded-lg mt-4 ${
                errors
                  ? "text-red-500 bg-red-100"
                  : "text-green-500 bg-green-100"
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

          <div className="mb-4 flex flex-col">
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
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                    placeholder=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4 pb-2">
              <label
                htmlFor="collection"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Collection <span className="text-rose-700">*</span>
              </label>
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                <span className="text-rose-700">*</span> Select a collection
              </span>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <select
                    name="collection"
                    id="collection"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                    value={collectionId}
                    onChange={(e) => setCollectionId(e.target.value)}
                    
                  >
                    <option value="">Select a collection</option>
                    {collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>


            <div className="sm:col-span-4">
              <label
                htmlFor="measurements"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Measurements in Meters<span className="text-rose-700">*</span>
              </label>
              <div className="mt-2">
                <div className="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    className="block w-1/2 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                    placeholder="Width in meters"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    
                  />
                  <input
                    type="text"
                    className="block w-1/2 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                    placeholder="Height in meters"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    
                  />
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
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Write a few sentences about this Item."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="medium"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mediums <span className="text-rose-700">*</span>
              </label>
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                <span className="text-rose-700">*</span> Select the Mediums you
                Used only 4/Four mediums allowed
              </span>
              <div className="mt-2 relative">
                {/* Display selected mediums */}
                <div className="border rounded-md p-1 bg-gray-100 flex flex-wrap">
                  {mediums
                    .filter((medium) => mediumId.includes(medium.id))
                    .map((selectedMedium) => (
                      <span key={selectedMedium.id} className="mr-1 mb-1">
                        {selectedMedium.name}
                      </span>
                    ))}
                </div>
                {/* Dropdown */}
                <div className="relative mt-1 mb-2">
                  <button
                    type="button"
                    className="border border-gray-300 bg-white rounded-md p-2 text-gray-700 w-full text-left focus:outline-none focus:ring focus:border-indigo-500"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown on click
                  >
                    Select Mediums
                    <svg
                      className={`h-5 w-5 text-gray-400 inline-block ml-1 ${
                        isDropdownOpen ? "transform rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                      {mediums.map((medium) => (
                        <label
                          key={medium.id}
                          className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-3 w-3 text-indigo-600 mr-2 rounded-lg"
                            value={medium.id}
                            checked={mediumId.includes(medium.id)}
                            
                            onChange={(e) => {
                              const mediumId = medium.id;
                              if (e.target.checked) {
                                setMediumId((prevIds) => [
                                  ...prevIds,
                                  mediumId,
                                ]);
                              } else {
                                setMediumId((prevIds) =>
                                  prevIds.filter((id) => id !== mediumId)
                                );
                              }
                            }}
                          />
                          {medium.name}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price <span className="text-rose-700">*</span>
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10 ${
                      parseInt(price) < 500 || parseInt(price) > 50000000
                        ? "border-red-500" // Add a red border for invalid prices
                        : ""
                    }`}
                    placeholder=""
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    
                  />
                </div>
                {(parseInt(price) < 500 || parseInt(price) > 50000000) && (
                  <p className="mt-2 text-sm text-red-500">
                    Price should be between $500 and $50,000,000.
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="year"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Year <span className="text-rose-700">*</span>
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 h-10 ${
                      isValidYear(year) ? "" : "border-red-500" // Add a red border for invalid years
                    }`}
                    placeholder=""
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    
                  />
                </div>
                {!isValidYear(year) && (
                  <p className="mt-2 text-sm text-red-500">
                    Please enter a valid year (1995 or later).
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="is-explicit"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Is Explicit? <span className="text-rose-700">*</span>
              </label>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  We require you to specify whether the content is explicit or
                  not in order to ensure that it complies with our content
                  guidelines. Please select one of the following options:
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isExplicit"
                      value="yes"
                      checked={isExplicit === "yes"}
                      onChange={() => setIsExplicit("yes")}
                      className="form-radio h-5 w-5 text-indigo-600"
                      
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isExplicit"
                      value="no"
                      checked={isExplicit === "no"}
                      onChange={() => setIsExplicit("no")}
                      className="form-radio h-5 w-5 text-indigo-600"
                      
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
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
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default CreateArt;
