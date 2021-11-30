import axiosClient from "./AxiosClient";

const url = "api/TourDetails";
const tourDetailsApi = {
  // Lấy danh sách các tour kèm các thông tin search
  Adm_InsertTourDetails: (params) => {
    return axiosClient.post(`${url}/Adm_InsertTourDetails`, params);
  },
  Adm_DeleteTourDetailsByTourIds: (params) => {
    return axiosClient.put(`${url}/Adm_DeleteTourDetailsByTourID`, params);
  },
};

export default tourDetailsApi;
