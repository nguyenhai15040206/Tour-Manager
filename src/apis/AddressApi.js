import axiosClient from "./AxiosClient";

const addressApi = {
  GetProvince: () => {
    const url = "api/TinhThanh";
    return axiosClient.get(url);
  },
};

export default addressApi;
