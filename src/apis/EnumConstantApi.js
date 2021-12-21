import axiosClient from "./AxiosClient";

const url = "api/EnumConstant";
const enumConstantApi = {
  // Lấy danh sách các tour kèm các thông tin search
  Adm_GetEnumConstantCbo: (params) => {
    return axiosClient.get(`${url}/Adm_GetEnumConstant`, { params });
  },
  Adm_GetEnumList: (params) => {
    return axiosClient.get(`${url}/Adm_GetEnumInfo`, { params });
  },
};

export default enumConstantApi;
