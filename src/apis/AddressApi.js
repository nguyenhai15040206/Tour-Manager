import axiosClient from "./AxiosClient";

const url = "api/Province";
const addressApi = {
  Adm_GetProvince: (params) => {
    return axiosClient.get(`${url}/Adm_GetProvince`, { params });
  },
};

export default addressApi;
