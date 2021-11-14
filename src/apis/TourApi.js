import axiosClient from "./AxiosClient";

const url = "api/Tour";
const tourApi = {
  // Lấy danh sách các tour kèm các thông tin search
  Adm_GetTourList: (params, token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axiosClient.post(`${url}/Adm_GetDataTourList`, params, config);
  },

  // Lấy danh sách các tour được đề xuất
  GetTourTourIsSuggest: () => {
    return axiosClient.get(`${url}/TourIsSuggest`);
  },

  getTourDetails: (tourID) => {
    return axiosClient.get(`${url}/TourDetails/${tourID}`);
  },

  postTour: (Tour) => {
    return axiosClient.post(url, Tour);
  },

  putTour: (tourID, Tour) => {
    return axiosClient.put(`${url}/${tourID}`, Tour);
  },

  deleteTour: (tourID) => {
    return axiosClient.delete(`${url}/${tourID}`);
  },
};

export default tourApi;
