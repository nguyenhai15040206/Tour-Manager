import axioxClient from "./AxiosClient";

const url = "api/UnitPrice";
const unitPriceApi = {
  Adm__InsertUnitPrice: (values) => {
    return axioxClient.post(`${url}/Adm_InsertUnitPirce`, values);
  },
  Adm__DeleteUnitPriceByTourIds: (DeleteModels) => {
    return axioxClient.put(`${url}/Adm_DeleteUnitPriceByTourID`, DeleteModels);
  },
};

export default unitPriceApi;
