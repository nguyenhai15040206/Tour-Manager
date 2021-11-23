import axioxClient from "./AxiosClient";

const url = "api/TouristAttraction";
const touristAttractionApi = {
  Adm__GetTouristAttrList: (values, token) => {
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // };
    return axioxClient.post(`${url}/Adm_GetTouristAttractionList`, values);
  },

  Adm_CreateTouristAttr: (values) => {
    return axioxClient.post(`${url}/Adm_CreateTourAttraction`, values);
  },

  Adm_DeleteTouristAttrList: (values) => {
    return axioxClient.put(`${url}/Adm_deleteTouristAttraction`, values);
  },
};

export default touristAttractionApi;
