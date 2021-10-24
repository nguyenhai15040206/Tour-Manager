import axios from "axios";
import queryString from "query-string";

const { REACT_APP_TOUR_MANAGER_API_KEY } = process.env;
const axiosClient = axios.create({
  baseURL: REACT_APP_TOUR_MANAGER_API_KEY,
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
