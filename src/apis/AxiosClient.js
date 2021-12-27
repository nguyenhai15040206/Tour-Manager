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

axiosClient.interceptors.request.use(
  async (config) => {
    // Handle token here ...
    const url = window.location.pathname.trim().split("/")[1];

    const checkToken =
      url === "my-tour"
        ? localStorage.getItem("accessTokenCustomer")
        : localStorage.getItem("accessTokenEmp") != null;
    let token = "";
    if (checkToken) {
      token =
        url === "my-tour"
          ? JSON.parse(localStorage.getItem("accessTokenCustomer")).accessToken
          : JSON.parse(localStorage.getItem("accessTokenEmp")).accessTokenEmp;
    }
    config.headers["Authorization"] = "bearer " + token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response.status;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
