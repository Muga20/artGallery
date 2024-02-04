import React, { useState , useEffect} from "react";
import MiniFooter from "../components/MiniFooter";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../config/ServerUrl";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [errors, setErrors] = useState("");
  const [validationErrors, setValidationErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const Reg_User = async (e) => {
    // Prevent the default form submission behavior (page reload)
    e.preventDefault();

    // Start loading animation by setting isLoading to true
    setIsLoading(true);

    try {
      // Make an HTTP POST request to the server to register a new user
      await axios.post(`${ServerUrl}/auth/register`, {
        email: email,
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      });

      // Set a success message to indicate successful user registration
      setSuccessMessage(
        "User registered successfully! Check your email to complete the registration process."
      );

      // Redirect the user to the login page after successful registration
      navigate("/login");

      // Clear any previously set error messages
      setErrors("");
      validationErrors("");
    } catch (error) {
      // In case of an error (e.g., registration failure or exception):
      // Set an error message based on the error object or a generic error message
      if (error.response?.status === 400) {
        const validationErrors = error.response.data.errors;
        // Map validation errors to setErrors
        const newErrors = {};
        validationErrors.forEach((errorObject) => {
          newErrors[errorObject.path] = errorObject.msg;
        });
        // Update the 'errors' state with the validation errors
        setValidationErrors(newErrors);
      } else if (error.response?.status === 409) {
        setErrors("Email already registered");
      } else if (error.response?.status === 402) {
        setErrors("Username has been registered");
      }
      // Clear any previously set success messages
      setSuccessMessage("");
    } finally {
      // Stop the loading animation by setting isLoading to false
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    // Update the email state based on user input
    setEmail(e.target.value);

    // Set showInfo to true if the email input is not empty
    setShowInfo(e.target.value !== "");
  };


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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-900 border-opacity-50"></div>
            </div>
          )}
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
                    {fieldName === "email" && "email is not valid"}
                    {fieldName === "firstName" &&
                      "first name field has a minimum length of 3 characters"}
                    {fieldName === "lastName" &&
                      "last name field has a minimum length of 3 characters"}
                    {fieldName === "username" &&
                      "username field has a minimum length of 4 characters"}
                    {fieldName === "password" &&
                      "password field has a minimum length of 6 characters"}
                  </li>
                ))}
              </ul>
              {errors || successMessage}
            </div>
          ) : null}

          <h1 className="text-2xl font-bold mt-4">Sign up</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={Reg_User}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="first_name"
                autoComplete="given-name"
                required
                className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="last_name"
                autoComplete="family-name"
                required
                className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
               <span
                  className="material-symbols-outlined absolute right-3 bottom-3 cursor-pointer "
                  onClick={handleShowPassword}
                >
                  {" "}
                  visibility{" "}
                </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-gradient-to-r from-gray-500 to-gray-800 text-white font-bold rounded-lg"
            >
              Sign Up
            </button>
          </div>

          <div className="flex justify-end">
            <Link to="/login" className="text-sm">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
        <div className="pt-5">
          <MiniFooter />
        </div>
      </div>
    </div>
  );
}
