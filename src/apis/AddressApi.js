import axiosClient from "./AxiosClient";

const urlWards = "api/Wards";
const url = "api/Province";
const urlDistrict = "api/District";

//code province
export const addressApi = {
  Adm_GetProvince: (params) => {
    return axiosClient.get(`${url}/Adm_GetProvince`, { params });
  },
  Adm_GetProvinceByRegions: (params) => {
    return axiosClient.get(`${url}/Adm_GetProvinceByRegions`, { params });
  },
  Adm_GetProvinceAndSearch: (params) => {
    return axiosClient.post(`${url}/Adm_GetProvinceAndSearch`, params);
  },
};

//code district
export const districtApi = {
  Adm_GetDisTrictByIdPro: (params) => {
    return axiosClient.post(
      `${urlDistrict}/Adm_GetDistrictByProvinceID`,
      params
    );
  },
  Adm_GetDistrictByProvinceCBB: (params) => {
    return axiosClient.get(`${urlDistrict}/Adm_GetDistrictByProvinceCBB`, {
      params,
    });
  },
};

//code wards
export const wardsApi = {
  Adm_GetWardsByIdPro: (params) => {
    return axiosClient.get(`${urlWards}/Adm_GetDataWardsByDistrict`, {
      params,
    });
  },
  Adm_GetDataWardsByDistrictCbb: (params) => {
    return axiosClient.get(`${urlWards}/Adm_GetDataWardsByDistrictCbb`, {
      params,
    });
  },
};

/// viet tng nay ne em, tinh chinh lai trong nay
