import axioxClient from "./AxiosClient";

const url = "api/UnitPrice";
const touristAttractionApi = {
  Adm__InsertUnitPrice: (values) => {
    return axioxClient.post(`${url}/Adm_InsertUnitPirce`, values);
  },
};

export default touristAttractionApi;
