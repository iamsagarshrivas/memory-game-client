import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:9001/api",
});

axiosInstance.interceptors.response.use(
  ({ data }) => data,
  (error) => Promise.reject(error)
);

export default axiosInstance;
