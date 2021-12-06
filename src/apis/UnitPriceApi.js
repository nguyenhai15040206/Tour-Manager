import axiosClient from "./AxiosClient";

const url = "api/UnitPrice";
const unitPriceApi = {
  Adm__InsertUnitPrice: (values) => {
    return axiosClient.post(`${url}/Adm_InsertUnitPirce`, values);
  },
  Adm_UpdateUnitPrice: (values) => {
    return axiosClient.put(`${url}/Adm_UpdateUnitPrice`, values);
  },
  Adm__DeleteUnitPriceByTourIds: (DeleteModels) => {
    return axiosClient.put(`${url}/Adm_DeleteUnitPriceByTourID`, DeleteModels);
  },
};

export default unitPriceApi;
