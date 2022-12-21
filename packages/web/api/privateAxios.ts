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
    return Promise.reject(error);
  }
);

export default axios;
