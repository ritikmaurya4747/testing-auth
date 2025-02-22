import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // API ka base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
