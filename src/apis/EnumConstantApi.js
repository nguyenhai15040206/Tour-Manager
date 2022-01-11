import axiosClient from "./AxiosClient";

const url = "api/EnumConstant";
const enumConstantApi = {
  // Lấy danh sách các tour kèm các thông tin search
  Adm_GetEnumConstantCbo: (params) => {
    return axiosClient.get(`${url}/Adm_GetEnumConstant`, { params });
  },

  // lấy các option từ emum
  Adm_GetEnumList: (params) => {
    return axiosClient.get(`${url}/Adm_GetEnumInfo`, { params });
  },

  //============= lây danh sách các bộ enum từ loại danh mục
  Adm_GetDataEnumListByType: (params) => {
    return axiosClient.get(`${url}/Adm_GetDataEnumListByType`, { params });
  },
  Adm_InsertCatEnum: (params) => {
    return axiosClient.post(`${url}/Adm_InsertCatEnum`, params);
  },
  Adm_DeleteCatEnum: (params) => {
    return axiosClient.put(`${url}/Adm_DeleteCatEnum`, params);
  },
  Adm_UpdateCatEnum: (params) => {
    return axiosClient.put(`${url}/Adm_UpdateCatEnum`, params);
  },
  Adm_GetEnumIDetails: (params) => {
    return axiosClient.get(`${url}/Adm_GetEnumIDetails`, { params });
  },
};

export default enumConstantApi;
