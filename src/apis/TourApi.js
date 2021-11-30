import axiosClient from "./AxiosClient";

const url = "api/Tour";
const tourApi = {
  // Lấy danh sách các tour kèm các thông tin search
  Adm_GetTourList: (values) => {
    return axiosClient.post(`${url}/Adm_GetDataTourList`, values);
  },

  // Lấy danh sách các tour được đề xuất
  GetTourTourIsSuggest: () => {
    return axiosClient.get(`${url}/TourIsSuggest`);
  },

  getTourDetails: (tourID) => {
    return axiosClient.get(`${url}/TourDetails/${tourID}`);
  },

  Adm_GetTourDetails: (params) => {
    return axiosClient.get(`${url}/Adm_GetTourDetails`, { params });
  },

  Adm_InsertTour: (Tour) => {
    return axiosClient.post(`${url}/Adm_InsertTour`, Tour);
  },
  Adm_DeleteTourByIds: (DeleteModels) => {
    return axiosClient.put(`${url}/Adm_DeleteTourByIds`, DeleteModels);
  },
};

export default tourApi;
