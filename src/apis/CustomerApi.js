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

  // Admin
  Adm_GetDataCustomerList: (params) => {
    const url = "api/Customer/Adm_GetDataCustomerList";
    return axiosClient.post(url, params);
  },
  Adm_RegisterCustomer: (params) => {
    const url = "api/Customer/MB_Cli_RegisterCustomer";
    return axiosClient.post(url, params);
  },
  Adm_DeleteCustomer: (params) => {
    const url = "api/Customer/Adm_DeleteCustomer";
    return axiosClient.put(url, params);
  },
};

export default customerApi;
