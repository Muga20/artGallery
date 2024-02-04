import React, { useState,useEffect } from "react";
import MiniFooter from "../components/MiniFooter";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";
import axios from "axios";
import { ServerUrl } from "../config/ServerUrl";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(""); // Store error messages
  const [validationErrors, setValidationErrors] = useState(""); // Store validation errors
  const [successMessage, setSuccessMessage] = useState(""); // Store success message
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const { dispatch } = UseAuthContext(); // Access authentication context
  const navigate = useNavigate(); // React Router's navigate function


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const Login_User = async (e) => {
    // Prevent the default form submission behavior (page reload)
    e.preventDefault();

    // Start loading animation by setting isLoading to true
    setIsLoading(true);

    try {
      // Make an HTTP POST request to the server to log in the user
      await axios
        .post(`${ServerUrl}/auth/login`, {
          emailOrUsername: emailOrUsername,
          password: password,
        })
        .then((response) => {
          // Retrieve the user data from the response
          const user = response.data;

          // Store the user data in a cookie
          document.cookie = `user=${JSON.stringify(user)}`;

          // Dispatch an action to update the user's login status
          dispatch({ type: "LOGIN", payload: user });
        });

      // Set a success message to indicate successful user login
      setSuccessMessage("User logged in successfully!");

      // Redirect the user to the homepage (or any desired location) after successful login
      navigate("/");

      // Clear any previously set error messages
      setErrors("");
      setValidationErrors("");
    } catch (error) {
      // In case of an error (e.g., registration failure or exception):
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
      } else if (error.response?.status === 404) {
        setErrors("User not found");
      } else if (error.response?.status === 401) {
        setErrors("Invalid credentials");
      } else if (error.response?.status === 403) {
        setErrors("Your account is suspended");
      }
      // Clear any previously set success messages
      setSuccessMessage("");
    } finally {
      // Stop the loading animation by setting isLoading to false
      setIsLoading(false);
    }
  };

  // const handleGoogleLogin = () => {
  //   // Initiate the Google OAuth flow
  //   // Redirect the user to Google's authentication page with the appropriate client_id
  //   const googleOAuthURL = 'https://accounts.google.com/o/oauth2/auth?' +
  //     'client_id=YOUR_GOOGLE_CLIENT_ID' +
  //     '&redirect_uri=YOUR_REDIRECT_URI' +
  //     '&scope=email%20profile' +
  //     '&response_type=code';
  //   window.location.href = googleOAuthURL;
  // };

  // const handleFacebookLogin = () => {
  //   // Initiate the Facebook OAuth flow
  //   // Redirect the user to Facebook's authentication page with the App ID
  //   const facebookOAuthURL = 'https://www.facebook.com/v13.0/dialog/oauth?' +
  //     'client_id=YOUR_FACEBOOK_APP_ID' +
  //     '&redirect_uri=YOUR_REDIRECT_URI' +
  //     '&scope=email';
  //   window.location.href = facebookOAuthURL;
  // };
  const handleShowPassword =async()=>{
    const input = document.querySelector("#password")
    const button = document.querySelector(".material-symbols-outlined")
    

    if(input.getAttribute('type')=="password"){
      input.setAttribute('type','text');
      button.innerHTML ="visibility"

    }else{
      input.setAttribute('type',"password");
      button.innerHTML ="visibility_off"
    }
  

  }
  
  return (
    <div className="min-h-screen flex">
      <div
        className="hidden sm:block bg-cover bg-center w-2/4"
        style={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
        }}
      />
      <div className="w-full sm:w-2/4 bg-gray-50">
        <div className="max-w-md mx-auto py-8 px-4">
          <div className="flex flex-col items-center">
            <div className="bg-secondary-main rounded-full p-2">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 11a4 4 0 11-8 0 4 4 0 018 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21v-2a4 4 0 00-3-3h-2a10 10 0 00-5-1.465m-4.14 2.237A10.001 10.001 0 002 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c-.84 0-1.662-.104-2.465-.303m-1.054-2.14c.348-.214.73-.375 1.128-.485M16 16l4.879 4.879M16 16l-4.879 4.879M16 16L11.121 20.879M16 16L11.121 11.121M16 16L16 11.121"
                />
              </svg>
            </div>
            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-900 border-opacity-50"></div>
              </div>
            )}
            <h1 className="mt-4 text-2xl font-bold">Log In</h1>
          </div>
          <form className="mt-6" onSubmit={Login_User}>
            {/* <div className="mt-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full py-3 bg-red-500 text-white font-bold rounded-lg"
              >
                Login with Google
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={handleFacebookLogin}
                className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg"
              >
                Login with Facebook
              </button>
            </div> */}

            <br />
          

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address or Username
              </label>
              <input
                type="text"
                id="email or username"
                name="email or username"
                autoComplete="email or username"
                required
                className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
              />
            </div>
            <div className="mt-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="flex flex-row  items-center w-full gap-3">
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="material-symbols-outlined absolute right-3 cursor-pointer "
                  onClick={handleShowPassword}
                >
                  {" "}
                  visibility{" "}
                </span>
              </div>
            </div>

            {Object.keys(validationErrors).length > 0 ||
            errors ||
            successMessage ? (
              <div
                className={`p-3 rounded-lg mt-4 ${
                  Object.keys(validationErrors).length > 0 || errors
                    ? "text-red-500 bg-red-100"
                    : successMessage
                    ? "text-green-500 bg-green-100"
                    : ""
                }`}
              >
                <ul>
                  {Object.keys(validationErrors).map((fieldName, index) => (
                    <li key={index}>
                      {fieldName === "emailOrUsername" &&
                        "email field is invalid"}
                      {fieldName === "password" &&
                        "password field has a minimum length of 6 characters"}
                    </li>
                  ))}
                </ul>
                {errors || successMessage}
              </div>
            ) : null}

            <div className="mt-4">
              <button
                type="submit"
                className="mt-4 w-full py-3 bg-gradient-to-r from-gray-500 to-gray-800 text-white font-bold rounded-lg"
              >
                Log In
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm">
                Forgot password?
              </Link>
            </div>
            <div className="mt-4 text-center">
              <Link to="/signup" className="text-sm">
                Don't have an account? Sign Up
              </Link>
            </div>
          </form>
        </div>
        <MiniFooter />
      </div>
    </div>
  );
};

export default Login;
