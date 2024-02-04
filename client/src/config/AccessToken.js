import jwt_decode from 'jwt-decode';


export function getAccessTokenFromCookie() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("user=")) {
      const userCookie = decodeURIComponent(cookie.substring("user=".length, cookie.length));
      try {
        const user = JSON.parse(userCookie);
        return user.accessToken.accessToken ? user.accessToken.accessToken : null;
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        return null;
      }
    }
  }
  return null;
}

export function isAdmin() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("user=")) {
      const userCookie = decodeURIComponent(cookie.substring("user=".length, cookie.length));
      try {
        const user = JSON.parse(userCookie);

        const accessToken = user.accessToken.accessToken;
        const decodedToken = jwt_decode(accessToken);

        // Check if user has admin role
        if (decodedToken && decodedToken.userId && decodedToken.userId.roles.includes('admin')) {
          return decodedToken.userId.roles.includes('admin'); // User is an admin
        } else {
          return null; // User is not an admin
        }
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        return false; // Unable to parse user cookie
      }
    }
  }
  return false; // User cookie not found
}