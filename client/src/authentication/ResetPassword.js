import React, { useState , useEffect} from "react";
import MiniFooter from "../components/MiniFooter";
import axios from "axios";
import { ServerUrl } from "../config/ServerUrl";
import { useNavigate, useParams } from "react-router-dom";


export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(""); // Store error messages
  const [validationErrors, setValidationErrors] = useState(""); // Store validation errors
  const [successMessage, setSuccessMessage] = useState(""); // Store success message
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const { token } = useParams(); // Get token from URL parameters
  const navigate = useNavigate(); // React Router's navigate function


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const Reset_Password = async (e) => {
    // Prevent the default form submission behavior (page reload)
    e.preventDefault();

    // Start loading animation by setting isLoading to true
    setIsLoading(true);

    try {
      // Make an HTTP POST request to the server to reset the password
      await axios.post(`${ServerUrl}/auth/reset_password/${token}`, {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      // After a successful password reset request:
      setTimeout(() => {
        // Set a success message to indicate password reset success
        setSuccessMessage("Password reset successfully");

        // Clear any previously set error messages
        setErrors("");
        setValidationErrors("");

        // Stop the loading animation by setting isLoading to false
        setIsLoading(false);
      }, 3000); // Display the success message for 3 seconds

      // Redirect the user to the login page after successful password reset
      navigate("/login");
    } catch (error) {
      // In case of an error (e.g., password reset request failure or exception):
      // Set an error message based on the error object or a generic error message
      if (error.response?.status === 400) {
        const validationErrorsData = error.response.data.errors;
        // Map validation errors to setValidationErrors
        const newValidationErrors = {};
        validationErrorsData.forEach((errorObject) => {
          newValidationErrors[errorObject.path] = errorObject.msg;
        });
        // Update the 'validationErrors' state with the validation errors
        setValidationErrors(newValidationErrors);
      } else if (error.response?.status === 402) {
        setErrors('Invalid or expired token');
      } else if (error.response?.status === 401) {
        setErrors('Password Does Not Match');
      }
      // Clear any previously set success messages
      setSuccessMessage("");

      // Stop the loading animation by setting isLoading to false
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-900 border-opacity-50"></div>
            </div>
          )}
          <h1 className="text-2xl font-bold mt-4">Reset Password</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={Reset_Password}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              required
              className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Added Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirm_password"
              autoComplete="new-password"
              required
              className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {Object.keys(validationErrors).length > 0 || errors || successMessage ? (
          <div className={`p-3 rounded-lg mt-4 ${
            (Object.keys(validationErrors).length > 0 || errors) ? "text-red-500 bg-red-100" : 
            (successMessage ? "text-green-500 bg-green-100" : "")
          }`}
        >
          <ul>
            {Object.keys(validationErrors).map((fieldName, index) => (
              <li key={index}>
                {fieldName === 'newPassword' && 'new password field has a minimum length of 6 characters'}
                {fieldName === 'confirmPassword' && 'confirm password password field has a minimum length of 6 characters'}
              </li>
            ))}
          </ul>
          {errors || successMessage}
        </div>
        ) : null}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-gradient-to-r from-gray-500 to-gray-800 text-white font-bold rounded-lg"
            >
              Reset Password
            </button>
          </div>
        </form>
        <MiniFooter />
      </div>
    </div>
  );
}
