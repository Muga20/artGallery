import React, { useState } from "react";
import { UseAuthContext } from "../../../hooks/UseAuthContext";
import { api } from "../../../middleware/Api";
import { useNavigate } from "react-router-dom";
import { getAccessTokenFromCookie } from "../../../config/AccessToken";

function AccSettings() {
  const { dispatch } = UseAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const accessToken = getAccessTokenFromCookie();
  // Function to handle the "Delete Account" action
  const handleDeleteAccount = async () => {
    // Close the modal and perform the account deletion logic here
    closeModal();
    // You can call your API to delete the account or take any necessary steps.
    try {
      // Get the user's ID from localStorage

      const response = await api(`/user/delete_user/${accessToken}`, "PATCH", {
        isActive: "0",
      });
      if (response.success) {
        // Log the user out after successfully deactivating their account
        logout();
      } else {
        console.log("Failed to Deactivate User");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const handleClick = () => {
    handleDeleteAccount(); // Call the handleDeleteAccount function with the user's ID
    navigate("/");
  };

  //function for updating user data
  const updateUserInfo = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const data = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      const response = await api(
        `/user/update_password_email/${accessToken}`,
        "patch",
        {},
        data
      );

      if (response) {
        setSuccessMessage("Account updated successfully");
        setErrors("");
      } else {
        setErrors("An error occurred");
        setSuccessMessage("");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors("email, Password and Confirm Password are required");
      } else if (error.response?.status === 401) {
        setErrors("Password Does Not Match");
      } else if (error.response?.status === 401) {
        setErrors("Password must be at least 6 characters");
      }
      setErrors(error.message || "An error occurred");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-white font-bold mb-4">Account Settings</h1>

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

      <span className="text-gray-200 pb-3">
        Edit your Account registration info{" "}
      </span>

      <form onSubmit={updateUserInfo}>
        <div class="mb-4">
          <label for="email" class="block text-gray-200 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            class="w-full border rounded py-2 px-3  focus:outline-none focus:border-blue-500"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-gray-200 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            class="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-gray-200 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            class="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div class="mb-6">
          <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            Save Changes
          </button>
        </div>
      </form>

      <div>
        <button
          onClick={openModal}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Delete Account
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white p-4 rounded-lg shadow-lg z-10">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete your account?
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-400 text-gray-800 hover:bg-gray-500 px-3 py-1 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleClick()}
                className="bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccSettings;
