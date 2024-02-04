// import jwt_decode from 'jwt-decode';
// import { UseAuthContext } from "../hooks/UseAuthContext";


// export const checkTokenExpiration = () => {
//   const { dispatch } = UseAuthContext();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = user ? user.accessToken.accessToken : null;

//   if (!token) {
//     console.log('Token not found in local storage');
//     return;
//   }

//   try {
//     const decodedToken = jwt_decode(token);

//     if (!decodedToken.exp) {
//       console.error('Token does not have an expiration time:', token);
//       return;
//     }

//     const expirationDate = new Date(decodedToken.exp * 1000);
//     const currentTime = new Date();
//     const timeDifference = expirationDate.getTime() - currentTime.getTime();


//     if (timeDifference <= 0) {
//       localStorage.removeItem("user");
//       dispatch({ type: "LOGOUT" });
//     } else {
//       setTimeout(() => {
//         dispatch({ type: "LOGOUT" });
//       }, timeDifference);
//     }
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     localStorage.removeItem("user");
//     dispatch({ type: "LOGOUT" });
//   }
// };
