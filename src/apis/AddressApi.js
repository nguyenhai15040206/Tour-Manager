import axiosClient from "./AxiosClient";

const addressApi = {
  GetProvince: () => {
    const url = "/TinhThanh";
    return axiosClient.get(url);
  },
};

export default addressApi;
