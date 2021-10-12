import axiosClient from "./AxiosClient";

const customerApi = {
  PostToken: (KhachHang) => {
    const url = "/Token";
    return axiosClient.post(url, KhachHang);
  },

  GetUserLogin: (token) => {
    const url = "/Token";
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default customerApi;
