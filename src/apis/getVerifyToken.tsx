import axios, { AxiosError } from "axios";

export const verifyToken = async () => {
  try {
    await axios.get("/api/verifyToken");
    console.log("Access token is valid");
    return true;
  } catch (error) {
    // accessToken이 만료된 경우
    const axiosError = error as AxiosError;
    console.log("Access token is Invalid");

    if (axiosError.response && axiosError.response.status === 401) {
      try {
        await axios.get("/api/refreshToken");
        console.log("refresh token is valid and new access token is issued");
        return true;
      } catch (refreshError) {
        // refreshToken도 만료된 경우
        console.log("refresh token is Invalid");
        return false;
      }
    } else {
      // 다른 종류의 오류
      console.log("server error");
      return false;
    }
  }
};
