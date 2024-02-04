import React, { useEffect, useState } from "react";
import { api } from "../../../middleware/Api";


function Settings() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [address, setAdrress] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const handleGetProfile = async () => {
    try {
      const response = await api(
        `/user/get_single_user`,
        "GET",
        {},
        {}
      );
      setFirst_name(response.user.first_name);
      setLast_name(response.user.last_name);
      setEmail(response.user.email);
      setPhone(response.user.phone);
      setGender(response.user.gender);
      setCity(response.user.city);
      setAdrress(response.user.address);
      setCountry(response.user.country);
      setBio(response.user.bio);
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
        first_name: first_name,
        last_name: last_name,
        email: email,
        bio: bio,
        city: city,
        address: address,
        phone: phone,
        country: country,
        gender: gender,
      };

      const response = await api(
        `/user/update_user`,
        "patch",
        {},
        data
      );

      handleGetProfile();

      setSuccessMessage("Profile updated successfully");

      // response? toast.info("profile updated successfully"): toast.error("not successful")
    } catch (error) {
      setErrors(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              First Name
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="text"
              name="first_name"
              placeholder="Your First Name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block font-medium text-white mb-1"
            >
              Last Name
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="text"
              name="last_name"
              placeholder="Your Last Name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-white mb-1"
            >
              Email
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="email"
              name="email"
              placeholder="Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={email ? true : false}
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block font-medium text-white mb-1"
            >
              Gender
            </label>
            <select
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              name="gender"
              value={gender}
              disabled={gender ? true : false}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block font-medium text-white mb-1"
            >
              Phone Number
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="text"
              name="phone"
              placeholder="Your Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          <div>
            <label htmlFor="city" className="block font-medium text-white mb-1">
              City
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="text"
              name="city"
              placeholder="Your City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block font-medium text-white mb-1"
            >
              Address
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="text"
              name="address"
              placeholder="Your Address"
              onChange={(e) => setAdrress(e.target.value)}
              value={address}
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block font-medium text-white mb-1"
            >
              Country
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="text"
              name="country"
              placeholder="Your Country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </div>
          <div>
            <label htmlFor="bio" className="block font-medium text-white mb-1">
              Bio
            </label>
            <textarea
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              name="bio"
              placeholder="Tell us something about yourself..."
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            ></textarea>
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
  );
}

export default Settings;
