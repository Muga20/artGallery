import { createContext, useReducer, useEffect } from "react";

// Create an AuthContext for global state management
export const AuthContext = createContext();

// Create a reducer function to update the state based on the action type
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // If the action type is 'LOGIN', update the state with the payload (user data)
      return { user: action.payload };

    case "LOGOUT":
      // If the action type is 'LOGOUT', clear the "user" cookie
      document.cookie = "user=; path=/; secure; samesite=strict; httponly"; // Add HttpOnly and Secure attributes
      return { user: null };

    default:
      // If the action type is not recognized, return the current state
      return state;
  }
};


// Create an AuthContextProvider component to wrap the application and provide authentication context
export const AuthContextProvider = ({ children }) => {
  // Initialize the state and dispatch function using the authReducer
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    // Check if there's a user cookie and update the state if found
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith("user=")) {
        const user = JSON.parse(cookie.substring("user=".length, cookie.length));
        dispatch({ type: "LOGIN", payload: user });
        break; // Only handle the first "user" cookie
      }
    }
  }, []);

  return (
    // Provide the AuthContext with the current state and dispatch function to the wrapped components
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children} {/* Render the child components */}
    </AuthContext.Provider>
  );
};
