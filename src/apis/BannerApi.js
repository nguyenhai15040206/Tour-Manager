import axiosClient from "./AxiosClient";

const url = "api/Banner";
const bannerApi = {
  //============= lây danh sách các bộ enum từ loại danh mục
  Adm_GetDataBanner: (params) => {
    return axiosClient.get(`${url}/Adm_GetDataBanner`, { params });
  },
  Adm_BannerDetails: (params) => {
    return axiosClient.get(`${url}/Adm_BannerDetails`, { params });
  },
  Adm_ActiveBanner: (params) => {
    return axiosClient.get(`${url}/Adm_ActiveBanner`, { params });
  },
  Adm_InsertBanner: (params) => {
    return axiosClient.post(`${url}/Adm_InsertBanner`, params);
  },
  Adm_DeleteBanner: (params) => {
    return axiosClient.put(`${url}/Adm_DeleteBanner`, params);
  },
  Adm_UpdateBanner: (params) => {
    return axiosClient.put(`${url}/Adm_UpdateBanner`, params);
  },
};

export default bannerApi;
