import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { getUsersData } from "./config/CheckRoles";
import { UseAuthContext } from "./hooks/UseAuthContext";

import Home from "./layouts/Home";
import Navbar from "./components/Navbar";
import React from "react";
import Footer from "./components/Footer";
import Checkout from "./pages/cart/Checkout";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import ForgotPassword from "./authentication/ForgotPassword";
import ResetPassword from "./authentication/ResetPassword";
import CreateArt from "./pages/arts/CreateArt";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateCollection from "./pages/collection/CreateCollection";
import CreateTag from "./pages/admin/CreateTags";

// import Art from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import VisitedProfile from "./pages/visitor/Profile";
import AdminLayout from "./components/AdminLayout";
import Settings from "./pages/profile/sideDiv/Settings";
import SingleCollection from "./pages/collection/SingleCollection";
import SingleArt from "./pages/arts/SingleArt";
import About from "./layouts/About";
import Cart from "./pages/cart/Cart";

import ErrorPage from "./layouts/ErrorPage";
import Dashboard from "./pages/admin/Dashboard";
import SingleCategory from "./pages/category/SingleCategory";
import jwt_decode from "jwt-decode";

import User from "./pages/admin/User";
import Tags from "./pages/admin/CreateTags";
import Category from "./pages/admin/Category";
import Medium from "./pages/admin/Medium";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminTags from "./pages/admin/AdminTags";
import CreateMedium from "./pages/admin/CreateMedium";
import Roles from "./pages/admin/Roles";
import CheckRoles from "./pages/admin/CheckRoles";
import AddUsersRoles from "./pages/admin/AddUsersRoles";
import { getAccessTokenFromCookie ,isAdmin } from "./config/AccessToken";
import ArtOwner from "./pages/admin/ArtOwner";
import ArtOwnerships from "./pages/admin/ArtOwnerships";
import ChangeArtOwnership from "./pages/profile/sideDiv/ChangeArtOwnership";
import EditArt from "./pages/arts/EditArt";
import SingleUser from "./pages/admin/SingleUser";
import SingleArtId from "./pages/admin/SingleArtId";
import PrivacyPolicy from "./layouts/PrivacyPolicy";
import Terms from "./layouts/Terms";
import EditApp from "./pages/admin/EditApp";
import AppName from "./pages/admin/AppName";
import CreateApp from "./pages/admin/CreateApp";

const Layout = () => {
  return (
    <div className="bg-customBackground">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const accessToken = getAccessTokenFromCookie();
const isAuthenticated = () => !!accessToken;
const admin = isAdmin();
const adminAuthenticate = () => !!admin;



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      // { path: "/checkout", element: <Checkout /> },
      {
        path: "/create-art",
        element: isAuthenticated() ? <CreateArt /> : <Navigate to="/" />,
      },
      // { path: "/cart", element: <Cart /> },
      { path: "/about", element: <About /> },
      { path: "/privacy", element: <PrivacyPolicy /> },
      { path: "/terms-conditions", element: <Terms /> },
      {
        path: "/admin/dashboard",
        element: isAuthenticated() ? <Dashboard /> : <Navigate to="/" />,
      },
      { path: "/single-art/:id", element: <SingleArt /> },
      { path: "/edit-art/:id", element: <EditArt /> },
      { path: "/single-collection/:id", element: <SingleCollection /> },
      {
        path: "/create-collection",
        element: isAuthenticated() ? <CreateCollection /> : <Navigate to="/" />,
      },
      { path: "/category/:id", element: <SingleCategory /> },
      { path: "/account/profile", element: isAuthenticated() ? <Profile /> : <Navigate to="/" />, },
      { path: "/profile-for/:id", element: isAuthenticated() ? <VisitedProfile /> : <Navigate to="/"/> },
      { path: "/changeOwnership/:id", element: <ChangeArtOwnership /> },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password/:userId/:token", element: <ResetPassword /> },
  {
    path: "/account/settings",
    element: isAuthenticated() ? <Settings /> : <Navigate to="/" />,
  },
  {
    path: "/admin",
    element: adminAuthenticate() ? <AdminLayout /> : <Navigate to="/" />,
  },
  {
    path: "/admin/app",
    element: adminAuthenticate() ? <AppName /> : <Navigate to="/" />,
  },
  {
    path: "/admin/createApp",
    element: adminAuthenticate() ? <CreateApp /> : <Navigate to="/" />,
  },
  {
    path: "/admin/Edit/:id",
    element: adminAuthenticate() ? <EditApp /> : <Navigate to="/" />,
  },
  {
    path: "/admin/user",
    element: adminAuthenticate() ? <User /> : <Navigate to="/" />,
  },
  {
    path: "/admin/user/:id",
    element: adminAuthenticate() ? <SingleUser /> : <Navigate to="/" />,
  },
  {
    path: "/admin/tags",
    element: adminAuthenticate() ? <AdminTags /> : <Navigate to="/" />,
  },
  {
    path: "/create-tags",
    element: adminAuthenticate() ? <CreateTag /> : <Navigate to="/" />,
  },
  {
    path: "/admin/category",
    element: adminAuthenticate() ? <Category /> : <Navigate to="/" />,
  },
  {
    path: "/create-category",
    element: adminAuthenticate() ? <CreateCategory /> : <Navigate to="/" />,
  },
  {
    path: "/admin/medium",
    element: adminAuthenticate() ? <Medium /> : <Navigate to="/" />,
  },
  {
    path: "/admin/createMedium",
    element: adminAuthenticate() ? <CreateMedium /> : <Navigate to="/" />,
  },
  {
    path: "/profile",
    element: adminAuthenticate() ? <AdminProfile /> : <Navigate to="/" />,
  },
  {
    path: "/admin/create-roles-permissions",
    element: adminAuthenticate() ? <Roles /> : <Navigate to="/" />,
  },
  {
    path: "/admin/roles-permissions",
    element: adminAuthenticate() ? <CheckRoles /> : <Navigate to="/" />,
  },
  {
    path: "/admin/create-user-roles",
    element: adminAuthenticate() ? <AddUsersRoles /> : <Navigate to="/" />,
  },
  {
    path: "/admin/art/:id",
    element: adminAuthenticate() ? <SingleArtId /> : <Navigate to="/" />,
  },
  {
    path: "/admin/arts",
    element: adminAuthenticate() ? <ArtOwner /> : <Navigate to="/" />,
  },
  {
    path: "/admin/userArtOwner/:id",
    element: adminAuthenticate() ? <ArtOwnerships /> : <Navigate to="/" />,
  },
  { path: "*", element: <ErrorPage /> },
]);

function App() {
  const { dispatch } = UseAuthContext();

  const checkTokenExpiration = () => {
    const accessToken = getAccessTokenFromCookie(); // Retrieve the access token from cookies

    if (!accessToken) {
      return;
    }

    try {
      const decodedToken = jwt_decode(accessToken);

      if (!decodedToken.exp) {
        console.error("Token does not have an expiration time:", accessToken);
        return;
      }

      const expirationDate = new Date(decodedToken.exp * 1000);
      const currentTime = new Date();
      const timeDifference = expirationDate.getTime() - currentTime.getTime();

      if (timeDifference <= 0) {
        // Perform the logout action here
        dispatch({ type: "LOGOUT" });
      } else {
        setTimeout(() => {
          // Perform the logout action after the token expiration time
          dispatch({ type: "LOGOUT" });
        }, timeDifference);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      // Handle the error and perform the logout action
      dispatch({ type: "LOGOUT" });
    }
  };

  useEffect(() => {
    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
