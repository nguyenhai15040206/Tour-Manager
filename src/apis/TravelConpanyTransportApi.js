import axiosClient from "./AxiosClient";

const url = "api/TravelConpanyTransport";
const travelConpanyTransportApi = {
  // Lấy danh sách các tour kèm các thông tin search
  Adm_GetCompanyList: (values) => {
    return axiosClient.post(`${url}/Adm_GetCompanyList`, values);
  },

  Adm_InsertCompany: (values) => {
    return axiosClient.post(`${url}/Adm_InsertCompany`, values);
  },
  Adm_UpdateCompany: (values) => {
    return axiosClient.put(`${url}/Adm_UpdateCompany`, values);
  },
  Adm_GetCompanyById: (params) => {
    return axiosClient.get(`${url}/Adm_GetCompanyDetails`, { params });
  },

  Adm_GetCompanyByTravelTypeCbo: (params) => {
    return axiosClient.get(`${url}/Adm_GetCompanyByTravelTypeCbo`, { params });
  },

  Adm_DeleteCompanyByIds: (DeleteModels) => {
    return axiosClient.put(`${url}/Adm_DeleteCompanyByIds`, DeleteModels);
  },
};

export default travelConpanyTransportApi;
