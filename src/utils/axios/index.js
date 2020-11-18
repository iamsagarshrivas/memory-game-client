import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9001/api",
});

axiosInstance.interceptors.response.use(
  ({ data }) => data,
  (error) => Promise.reject(error)
);

export default axiosInstance;
