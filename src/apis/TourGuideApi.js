import axiosClient from "./AxiosClient";
const url = "api/TourGuide";
const tourGuideApi = {
  Adm_GetDataTourGuide: (param) => {
    return axiosClient.post(`${url}/Adm_GetDataTourGuide`, param);
  },
  Adm_CreateTourGuide: (params) => {
    return axiosClient.post(`${url}/Adm_CreateTourGuide`, params);
  },
  Adm_UpdateTourGuide: (params) => {
    return axiosClient.put(`${url}/Adm_UpdateTourGuide`, params);
  },
  Adm_DeleteTourGuide: (params) => {
    return axiosClient.put(`${url}/Adm_DeleteTourGuide`, params);
  },

  Adm_GetDataTourGuidCondition: (params) => {
    return axiosClient.get(`${url}/Adm_GetDataTourGuidCondition`, { params });
  },
  Adm_GetTourGuideByID: (params) => {
    return axiosClient.get(`${url}/Adm_GetTourGuideByID`, { params });
  },
};
export default tourGuideApi;
