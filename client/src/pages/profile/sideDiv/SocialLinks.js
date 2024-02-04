import React, { useEffect, useState } from "react";
import { api } from "../../../middleware/Api";

function SocialLinks() {
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [reddit, setReddit] = useState("");
  const [pinterest, setPinterest] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const handleGetProfile = async () => {
    try {
      const response = await api(`/user/get_social_links`, "GET", {}, {});
      setFacebook(response.socialLinks.facebook);
      setTwitter(response.socialLinks.twitter);
      setInstagram(response.socialLinks.instagram);
      setReddit(response.socialLinks.reddit);
      setPinterest(response.socialLinks.pinterest);

    } catch (error) {}
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use setTimeout to set isLoading back to false after two seconds
    setTimeout(() => {
      setIsLoading(false); // set loading to false after two seconds
    }, 2000); // 2000 milliseconds (2 seconds)

    try {
      const data = {
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        reddit: reddit,
        pinterest: pinterest,
      };

      const response = await api(`/user/update_social_links`, "patch", {}, data);

      handleGetProfile();

      setSuccessMessage("Links updated successfully");

      // response? toast.info("profile updated successfully"): toast.error("not successful")
    } catch (error) {
      setErrors(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section>
        <h1 className="text-2xl text-white font-bold mb-4">Profile Update</h1>
        <form onSubmit={handleSubmit}>
          <div className="pb-2">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="first_name"
                className="block font-medium text-white mb-1"
              >
                Twitter Handle
              </label>
              <input
                className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
                type="text"
                name="twitter "
                placeholder=" Twitter Handle"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block font-medium text-white mb-1"
              >
                Facebook Handle
              </label>
              <input
                className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
                type="text"
                name="facebook"
                placeholder="Facebook Handle"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-white mb-1"
              >
                Instagram Handle
              </label>
              <input
                className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
                type="text"
                name="instagram"
                placeholder="Instagram Handle"
                onChange={(e) => setInstagram(e.target.value)}
                value={instagram}
               
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block font-medium text-white mb-1"
              >
                Reddit Handle
              </label>
              <input
                className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
                type="text"
                name="reddit"
                placeholder="Reddit Handle"
                onChange={(e) => setReddit(e.target.value)}
                value={reddit}
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block font-medium text-white mb-1"
              >
                Pinterest Handle
              </label>
              <input
                className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
                type="text"
                name="Pinterest"
                placeholder="Pinterest Handle"
                onChange={(e) => setPinterest(e.target.value)}
                value={pinterest}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700"
            >
              Save Profile
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default SocialLinks;
