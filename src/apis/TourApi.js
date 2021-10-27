import axiosClient from "./AxiosClient";

const url = "/Tour";
const tourApi = {
  getTour: (params) => {
    return axiosClient.get(`${url}`, { params });
  },

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
