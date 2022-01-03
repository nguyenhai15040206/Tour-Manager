import axiosClient from "./AxiosClient";

const url = "api/Tour";
const tourApi = {
  // Lấy danh sách các tour kèm các thông tin search
  Adm_GetTourList: (values) => {
    return axiosClient.post(`${url}/Adm_GetDataTourList`, values);
  },
  // Lấy danh timkf kiếm các tour theo điều kiện ở Cli
  Cli_GetDataTourSearch: (values) => {
    return axiosClient.post(`${url}/Cli_GetDataTourSearch`, values);
  },

  // Lấy danh sách các tour được đề xuất
  GetTourTourIsSuggest: (params) => {
    return axiosClient.get(`${url}/TourIsSuggest`, { params });
  },
  GetTourTourIsSuggestFamily: (params) => {
    return axiosClient.get(`${url}/TourIsSuggest`, { params });
  },

  getTourDetails: (params) => {
    return axiosClient.get(`${url}/TourDetails`, { params });
  },

  Adm_GetTourDetails: (params) => {
    return axiosClient.get(`${url}/Adm_GetTourDetails`, { params });
  },

  Adm_InsertTour: (Tour) => {
    return axiosClient.post(`${url}/Adm_InsertTour`, Tour);
  },
  Adm_UpdateTourById: (tour) => {
    return axiosClient.put(`${url}/Adm_UpdateTourById`, tour);
  },
  Adm_DeleteTourByIds: (DeleteModels) => {
    return axiosClient.put(`${url}/Adm_DeleteTourByIds`, DeleteModels);
  },

  //===================
  Adm_UpdateSuggest: (params) => {
    return axiosClient.get(`${url}/Adm_UpdateSuggest`, { params });
  },

  SendMessageTourExpired: (params) => {
    return axiosClient.get(`${url}/SendMessageTourExpired`, { params });
  },

  //================= nhân bản tour
  Adm_InsertTourAvailable: (params) => {
    return axiosClient.post(`${url}/Adm_InsertTourAvailable`, params);
  },
};

export default tourApi;
