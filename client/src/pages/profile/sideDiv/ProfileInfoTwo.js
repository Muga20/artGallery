import React, { useState, useEffect, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { api } from "../../../middleware/Api";
import io from "socket.io-client";
import { ServerUrl } from "../../../config/ServerUrl";
import { getAccessTokenFromCookie } from "../../../config/AccessToken";

const socket = io.connect(ServerUrl);

function ProfileInfoTwo() {
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tempProfileImageFile, setTempProfileImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fileInputRef = useRef(null);

  const accessToken = getAccessTokenFromCookie();

  // Defines an async function 'getUsersData' to fetch user data from an API, triggered by a 'useEffect' hook when 'tempProfileImageFile' changes,
  //and updates the component's state with the fetched data while managing loading and error states.
  const getUsersData = async () => {
    try {
      setLoading(true);

      const response = await api(
        `/user/get_single_user`,
        "GET",
        {},
        {}
      );

      setUserData(response.user);

      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Error fetching collections:", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, [tempProfileImageFile]);

  const handleEditProfileImageClick = () => {
    fileInputRef.current.click();
  };

  // Handles the change of a file input by updating the displayed image, setting a temporary file,
  //and enabling editing mode when a file is selected.
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setTempProfileImageFile(file);
      setIsEditing(true);
    }
  };

  // Handles the cancel action for editing a profile image by reverting to the previous image,
  // resetting editing state, and clearing the temporary image file.
  const handleCancelClick = () => {
    setImage(image); // Revert to the previous image
    setIsEditing(false);
    setTempProfileImageFile(null);
  };

  // Handles the process of saving a new profile image by sending a PATCH request to the server with the selected image file,
  //displaying success or error messages, and triggering a data reload upon success while managing loading and editing states.

  const handleImageSave = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("image", tempProfileImageFile);

      const response = await api("/user/replace_image", "patch", {}, formData);

      if (response) {
        setSuccessMessage("Profile image updated successfully");
        setErrors("");

        // Emit a WebSocket message to notify the server about the profile image update
        socket.emit("profileImageUpdated", { accessToken });


        // Trigger a reload of user data after the cover photo is changed
        getUsersData();
      } else {
        setErrors("An error occurred");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrors(error.message || "An error occurred");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
      setIsEditing(false);
      setTempProfileImageFile(null);
    }
  };



  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    // Simulate a loading delay for demonstration purposes
    const loadingTimeout = setTimeout(() => {
      setImageLoaded(true);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(loadingTimeout);
  }, []); // This effect runs only once when the component mounts



  return (
    <div>
 <div className="relative">
      {!imageLoaded && (
        <div className="h-40 w-40 rounded-full object-cover mr-4">
          {/* Placeholder cards with flashing animation for profile image */}
          {Array.from({ length: 1 }).map((_, index) => (
            <div
              key={index}
              className="bg-white h-40 w-40 rounded-full object-cover mr-4 animate-pulse"
            ></div>
          ))}
        </div>
      )}

      <img
        src={userData.image}
        loading="lazy"
        alt="Profile Image"
        className={`h-40 w-40 rounded-full object-cover mr-4
         ${ !imageLoaded ? 'hidden' : ''}`}
        onLoad={handleImageLoad}
      />

      <div
        className={`absolute inset-0 flex items-center justify-center cursor-pointer ${
          isEditing
            ? "hidden"
            : "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        }`}
        onClick={handleEditProfileImageClick}
        style={{ background: "rgba(0, 0, 0, 0.3)" }}
      >
        <AiFillEdit className="text-gray-900 text-2xl" />
      </div>

      {isEditing && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 h-40 w-40 rounded-full">
          <div className="text-white text-base">
            <button onClick={handleImageSave} className="mr-2 bg-transparent">
              Save
            </button>
            <button onClick={handleCancelClick} className="mr-2 bg-transparent">
              Cancel
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
    </div>
  );
}

export default ProfileInfoTwo;






