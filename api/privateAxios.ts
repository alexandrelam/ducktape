import axios from "axios";
import { getCookie } from "../utils/cookie";

axios.defaults.baseURL = process.env.API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = getCookie("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
