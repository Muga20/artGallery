import React, { useState , useEffect} from "react";
import MiniFooter from "../components/MiniFooter";
import { Link } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../config/ServerUrl";

export default function ResetPassword() {
  
  // State variables to store form data, error messages, and loading state
  const [email, setEmail] = useState(""); // Store the email entered by the user
  const [errors, setErrors] = useState(""); // Store error messages
  const [successMessage, setSuccessMessage] = useState(""); // Store success message
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [validationErrors, setValidationErrors] = useState({}); // Store validation errors


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  // Function to handle the password reset process
  const resetPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    setIsLoading(true); // Set loading state to true

    try {
      // Make an HTTP POST request to the server to initiate the password reset process
      await axios.post(`${ServerUrl}/auth/forgot_password`, {
        email: email,
      });

      setSuccessMessage("Recovery email sent successfully"); // Set a success message
      setErrors(""); // Clear any previously set error messages
      setValidationErrors({}); // Clear validation errors
    } catch (error) {
      if (error.response?.status === 400) {
        const validationErrorsData = error.response.data.errors;
        const newValidationErrors = {};
        // Map validation errors to setValidationErrors
        validationErrorsData.forEach((errorObject) => {
          newValidationErrors[errorObject.path] = errorObject.msg;
        });
        setValidationErrors(newValidationErrors); // Update the 'validationErrors' state with the validation errors
      } else if (error.response?.status === 401) {
        setErrors("Email does not exist"); // Set an error message
      }
      setSuccessMessage(""); // Clear any previously set success messages
    } finally {
      setIsLoading(false); // Stop the loading animation by setting isLoading to false
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
          <h1 className="text-2xl font-bold mt-4">Forgot Password</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={resetPassword}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              autoComplete="new-password"
              required
              className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {(Object.keys(validationErrors).length > 0 || errors || successMessage) && (
            <div className={`p-3 rounded-lg mt-4 ${
              (Object.keys(validationErrors).length > 0 || errors) ? "text-red-500 bg-red-100" :
              (successMessage ? "text-green-500 bg-green-100" : "")
            }`}
            >
              <ul>
                {Object.keys(validationErrors).map((fieldName, index) => (
                  <li key={index}>
                    {fieldName === 'email' && 'Email field is invalid'}
                  </li>
                ))}
              </ul>
              {errors || successMessage}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-gradient-to-r from-gray-500 to-gray-800 text-white font-bold rounded-lg"
            >
              Reset Password
            </button>
          </div>
          <div className="flex justify-end">
            <Link to="/login" className="text-sm">
              Recovered credentials? Sign in
            </Link>
          </div>
        </form>
        <MiniFooter />
      </div>
    </div>
  );
}
