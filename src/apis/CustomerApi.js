import axiosClient from "./AxiosClient";

const customerApi = {
  PostToken: (KhachHang) => {
    const url = "api/Customer/AccessToken";
    return axiosClient.post(url, KhachHang);
  },
};

export default customerApi;
