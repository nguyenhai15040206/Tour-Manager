import axiosClient from "./AxiosClient";

const url = "api/Statistical";
const statisticalApi = {
  //============= lây danh sách các bộ enum từ loại danh mục
  Adm_StatisticalEmployee: (params) => {
    return axiosClient.get(`${url}/Adm_StatisticalEmployee`, { params });
  },
  Adm_StatisticalBookingTour: (params) => {
    return axiosClient.get(`${url}/Adm_StatisticalBookingTour`, { params });
  },
};

export default statisticalApi;
