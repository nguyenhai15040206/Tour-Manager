import axiosClient from "./AxiosClient";

const url = "api/Tour";
const tourApi = {
  // Lấy danh sách các tour kèm các thông tin search
  Adm_GetTourList: (values, token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axiosClient.post(`${url}/Adm_GetDataTourList`, values, config);
  },

  // Lấy danh sách các tour được đề xuất
  GetTourTourIsSuggest: () => {
    return axiosClient.get(`${url}/TourIsSuggest`);
  },

  getTourDetails: (tourID) => {
    return axiosClient.get(`${url}/TourDetails/${tourID}`);
  },

  Adm_InsertTour: (Tour, token) => {
    console.log(token);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axiosClient.post(`${url}/Adm_InsertTour`, Tour, config);
  },

  putTour: (tourID, Tour) => {
    return axiosClient.put(`${url}/${tourID}`, Tour);
  },

  deleteTour: (tourID) => {
    return axiosClient.delete(`${url}/${tourID}`);
  },
};

export default tourApi;
