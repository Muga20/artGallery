import React, { useEffect, useState } from "react";
import { MdInsertPhoto } from "react-icons/md";
import { api } from "../../middleware/Api";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


function EditArt() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState([]);
  const [getCollection, setGetCollection] = useState('');
  const [price, setPrice] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExplicit, setIsExplicit] = useState(false);
  const navigate = useNavigate()
  const { id } = useParams();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await api(`/art/get_all_data`, "GET", {}, {});
        setCollection(response.collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    getCollections();
  }, []);

  const refreshData = async () => {
    try {
      const response = await api(`/art/get_art_by_id/${id}`, "GET", {}, {});
      setName(response.art.name);
      setCategory(response.art.category);
      setMediums(response.art.art_mediums);
      setYear(response.art.year);
      setPrice(response.art.price);
      setImage(response.art.image);
      setWidth(response.art.width);
      setHeight(response.art.height);
      setIsExplicit(response.art.isExplicit);
      setGetCollection(response.art.collection);
      setDescription(response.art.description);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshData();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    const data = {
    description: description,
    price: price,
    collection: getCollection
   }


    try {
      const response = await api(`/art/edit_art_by_id/${id}`, "PUT", {}, data);
      navigate('/account/profile')
      setErrors(""); // Clear any previous errors
    } catch (error) {
      setErrors(error.message || "An error occurred"); // Set the error message
      setSuccessMessage(""); // Clear any previous success message
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage("Art updated successfully!");
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


  return (
    <main className="flex flex-col justify-center p-10">
      <h1 className="text-3xl font-bold text-white pb-4">Edit Art</h1>

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
             fields
          </h2>

          <div className="mb-4 grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image, Video, Audio, or 3D Model{" "}
                
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
             
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                 
                   <img  className="mx-auto h-32 w-40 object-cover" src={image}/>
                  </label>
                </div>
              </div>
              </div>
            </div>
          </div>

          <div className="sm:col-span-4 pb-2">
            <label
              htmlFor="category-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              category 
            </label>
            <div className="mt-2">
               <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                    placeholder=""
                    value={category} 
                    disabled={category ? true : false}              
                  />
                </div>
            </div>
           </div>

          <div className="mb-4 flex flex-col">
            <div className="sm:col-span-4">
              <label
                htmlFor="category-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title 
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                    placeholder=""
                    value={name}  
                    disabled={name ? true : false}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4 pb-2">
              <label
                htmlFor="collection"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Collection 
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
               
                    <select
                    name="collection"
                    id="collection"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                    value={getCollection}  
                    disabled={getCollection ? true : false}
                    onChange={(e) => setGetCollection(e.target.value)}
                    >
                    <option value="">Select a collection</option>
                    {collection.map((item) => (
                        <option key={item.id} value={item.name}>
                        {item.name}
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
                Measurements in Meters
              </label>
              <div className="mt-2">
                <div className="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    className="block w-1/2 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                    placeholder="Width in meters"
                    value={`width ${width}`} 
                    disabled={width ? true : false}
                  />
                  <input
                    type="text"
                    className="block w-1/2 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                    placeholder="Height in meters"
                    value={` height  ${height}`}
                    disabled={height ? true : false}
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
                  className="block w-full rounded-md border-0 py-1.5 pl-1 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Write a few sentences about this Item."
                  value={description}
                  disabled={description ? true : false}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="medium"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mediums 
              </label>
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                Mediums you Used </span>
              <div className="mt-2 relative">
                <div className="border rounded-md p-1 flex flex-wrap">
                            {mediums.map((selectedMedium, index) => (
                        <span key={index} className="mr-1 mb-1">
                        {selectedMedium}
                        {index < mediums.length - 1 && ','} {/* Add comma if not the last element */}
                        </span>
                    ))}
                </div>

              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price 
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
                Year 
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
                    disabled={year ? true : false}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="is-explicit"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Is Explicit? 
              </label>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  We require you to specify whether the content is explicit or
                  not in order to ensure that it complies with our content
                  guidelines. Please select one of the following options:
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  {isExplicit === false ? (
                       <label className="inline-flex items-center">
                       <input
                         type="radio"
                         name="isExplicit"
                         value="no"
                         checked={isExplicit === "no"}
                         className="form-radio h-5 w-5 text-indigo-600"
                       />
                       <span className="ml-2">No</span>
                       </label>
                     ):(
                      <label className="inline-flex items-center">
                      <input
                      type="radio"
                      name="isExplicit"
                      value="yes"
                      checked={isExplicit === "yes"}
                      className="form-radio h-5 w-5 text-indigo-600"
                      />
                      <span className="ml-2">Yes</span>
                     </label>
                   )}          
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to='/account/profile'>
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

export default EditArt;


