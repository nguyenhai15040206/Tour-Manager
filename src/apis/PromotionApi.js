import axiosClient from "./AxiosClient";

const url = "api/Promotion";
const promotionApi = {
  // Lấy danh sách các tour kèm các thông tin search
  Adm_GetPromotionList: (values) => {
    return axiosClient.post(`${url}/Adm_GetDataPromotion`, values);
  },

  Adm_GetPromotionById: (params) => {
    return axiosClient.get(`${url}/Adm_PromotionDetails`, { params });
  },

  Adm_InsertPromotion: (promotion) => {
    return axiosClient.post(`${url}/Adm_CreatePromotion`, promotion);
  },
  Adm_UpdatePromotionById: (promotion) => {
    return axiosClient.put(`${url}/Adm_UpdatePromotion`, promotion);
  },
  Adm_DeletePromotionByIds: (DeleteModels) => {
    return axiosClient.put(`${url}/Adm_DeletePromotionByIds`, DeleteModels);
  },
  Adm_DeletePromotionExpired: (DeleteModels) => {
    return axiosClient.put(`${url}/Adm_DeletePromotionExpired`, DeleteModels);
  },
};

export default promotionApi;
