import axiosClient from "./AxiosClient";

const url = "api/TourDetails";
const tourDetailsApi = {
  // Lấy danh sách các tour kèm các thông tin search
  Adm_InsertTourDetails: (params, token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axiosClient.post(`${url}/Adm_InsertTourDetails`, params, config);
  },
};

export default tourDetailsApi;
