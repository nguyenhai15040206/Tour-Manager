import axioxClient from "./AxiosClient";

const url = "api/TouristAttraction";
const touristAttractionApi = {
  Adm__GetTouristAttrList: (values) => {
    return axioxClient.post(`${url}/Admin_GetTouristAttractionList`, values);
  },
  Adm_GetTouristAttByRegions: (params) => {
    return axioxClient.get(`${url}/Adm_GetTouristAttByRegions`, { params });
  },
};

export default touristAttractionApi;
