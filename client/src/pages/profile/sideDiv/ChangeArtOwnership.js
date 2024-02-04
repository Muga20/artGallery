import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../middleware/Api";

function ChangeArtOwnership() {
    const [arts, setArts] = useState({});
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {id} = useParams()
    const navigate = useNavigate()


     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


      const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
    
        if (isNaN(date)) {
          return "Invalid Date";
        }
    
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleString(undefined, options);
      };


     const refreshData = async () => {
        try {
          const response = await api(`/art/get_art_by_id/${id}`, "GET", {}, {});
          setArts(response.art);
        } catch (err) {
          console.error(err);
        }
      };
    
      useEffect(() => {
        refreshData();
      }, [id]);

      const handleUpdate = async (e) => {
            e.preventDefault();
            setIsLoading(true);

       try{
            const data = {
              username: username,
              art_id: arts.id,    
              price: arts.price,    
              category_id: arts.category_id,    
              collection_id: arts.collection_id,    
              collection_name: arts.collection,    
            };

           const response = await api('/art/changeArtOwnership', "POST", {}, data);        
             navigate('/account/profile');
            setUsername("");
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

    


  return (
    <section className="dark:bg-gray-700"> 

         

    <section className="px-6 py-6 mx-auto">
  
     <div className="w-full mx-auto">
        <div className=" mx-auto py-8 px-4">

        <div className="w-60 mx-auto">
             <img className="rounded-lg object-cover h-48 w-full" src={arts.image} alt={`Art- ${arts.name}`}/>
        </div>

            <div className="pt-3">
                <p className="text-white capitalize">This Action u Will Be Changing  The Owner Of the Art From You The New Owner</p>
            </div>
          
          <form onSubmit={handleUpdate}>
            <div class="w-full rounded-xl p-2 shadow-white/40">
              <div class=" flex flex-col">
                <div className="sm:col-span-4">
                  <label htmlFor="CreateMedium-name" className="block text-sm font-medium leading-6 text-white">
                    Username
                  </label>

                  {isLoading && (
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white border-opacity-50"></div>
                      </div>
                    )}

                    {(errors || successMessage) && (
                        <div
                        className={`rounded-lg ${
                            errors
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                        >
                        {errors || successMessage}
                        </div>
                    )}

                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                        placeholder="Enter Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                    </div>

                    <div class="flex flex-col">
                        <div className="mt-6 gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          
        </div>
      </div>
    </section>
    </section>
  )
}

export default ChangeArtOwnership