import axioxClient from "./AxiosClient";

const url = "api/TouristAttraction";
const touristAttractionApi = {
  Adm__GetTouristAttrList: (values) => {
    return axioxClient.post(`${url}/Adm_GetTouristAttractionList`, values);
  },
  Adm_GetTouristAttByRegions: (params) => {
    return axioxClient.get(`${url}/Adm_GetTouristAttByRegions`, { params });
  },
  Adm_CreateTouristAttr: (values) => {
    return axioxClient.post(`${url}/Adm_CreateTourAttraction`, values);
  },

  Adm_DeleteTouristAttrList: (values) => {
    return axioxClient.put(`${url}/Adm_deleteTouristAttraction`, values);
  },
  Adm_GetTouristAttById: (params) => {
    return axioxClient.get(`${url}/Adm_GetTourAttrByID`, { params });
  },
  Adm_EditTouristAttr: (values) => {
    return axioxClient.put(`${url}/Adm_UpdateTouristAttraction/`, values);
  },
};

export default touristAttractionApi;
