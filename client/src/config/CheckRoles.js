import { api } from "../middleware/Api";
import { getAccessTokenFromCookie } from "../config/AccessToken";

export const getUsersData = async () => {
  try {

    const accessToken = getAccessTokenFromCookie();

    const response = await api(`/user/check_roles/${accessToken}`, "GET", {}, {});
    return response.roleNames;
    
  } catch (error) {
    console.error("Error fetching Roles:", error);
    return [];
  }
};
