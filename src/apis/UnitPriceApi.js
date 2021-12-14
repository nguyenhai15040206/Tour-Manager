import axiosClient from "./AxiosClient";

const url = "api/UnitPriceTransport";
const unitPriceTransportApi = {
  Adm_GetDataUnitPrice: (values) => {
    return axiosClient.post(`${url}/Adm_GetDataUnitPrice`, values);
  },
  Adm_UnitPriceTransportDetails: (params) => {
    return axiosClient.get(`${url}/Adm_UnitPriceTransportDetails`, { params });
  },
  Adm__InsertUnitPrice: (values) => {
    return axiosClient.post(`${url}/Adm_CreateUnitPriceTransport`, values);
  },
  Adm_UpdateUnitPrice: (values) => {
    return axiosClient.put(`${url}/Adm_UpdateUnitPriceTransport`, values);
  },
  Adm__DeleteUnitPriceByTourIds: (DeleteModels) => {
    return axiosClient.put(
      `${url}/Adm_DeleteUnitPriceTransportByIds`,
      DeleteModels
    );
  },
};

export default unitPriceTransportApi;
