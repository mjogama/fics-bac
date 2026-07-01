import axios from "axios";
import { baseURL } from "../constants/baseURL";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Optional: 401 → send user to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = "/auth/login";
    }
    return Promise.reject(err);
  },
);

export default api;
