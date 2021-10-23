import axios from "axios";
import queryString from "query-string";

// const { TOUR_MANAGER_API_KEY } = process.env;
const axiosClient = axios.create({
  baseURL: "http://localhost:2801/api",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    console.log(response.status);
    return response.status;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
