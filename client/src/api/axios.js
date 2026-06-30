import axios from "axios";
import { baseURL, paths } from "../constants/paths";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Optional: 401 → send user to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = paths.login;
    }
    return Promise.reject(err);
  },
);

export default api;
