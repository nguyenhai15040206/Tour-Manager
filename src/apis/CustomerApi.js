import axiosClient from "./AxiosClient";

const customerApi = {
  PostToken: (KhachHang) => {
    const url = "api/Customer/AccessToken";
    return axiosClient.post(url, KhachHang);
  },
  Cli_GetCustomerInfo: (params) => {
    const url = "api/Customer/MB_Cli_GetInforCustumer";
    return axiosClient.get(url, { params });
  },
  Cli_UpdateCustomer: (params) => {
    const url = "api/Customer/MB_Cli_UpdateCustomer";
    return axiosClient.put(url, params);
  },
};

export default customerApi;
