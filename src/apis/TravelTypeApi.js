import axiosClient from "./AxiosClient";
// Nguyễn Tấn Hải - 20211128
const url = "api/TravelType";
const tourApi = {
  // Lấy danh sách các Travel Type kèm các thông tin search
  Adm_GetTravelTypeCbo: () => {
    return axiosClient.get(`${url}/Adm_GetTravelTypeCbo`);
  },
};

export default tourApi;
