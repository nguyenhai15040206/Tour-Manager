import axioxClient from "./AxiosClient";

const url = "api/TouristAttraction";
const touristAttractionApi = {
  Adm__GetTouristAttrList: (values, token) => {
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // };
    return axioxClient.post(`${url}/Admin_GetTouristAttractionList`, values);
  },
};

export default touristAttractionApi;
