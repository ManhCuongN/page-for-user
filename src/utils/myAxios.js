import axios from 'axios';

const MyAxios = axios.create();

// Thêm một interceptor request
MyAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userId = localStorage.getItem("userId");
    if (accessToken && refreshToken && userId) {
      config.headers["x-client-id"] = userId;
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      config.headers["x-rtoken-id"] = refreshToken;
      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default MyAxios;
