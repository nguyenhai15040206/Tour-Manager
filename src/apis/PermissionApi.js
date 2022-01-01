import axiosClient from "./AxiosClient";

const permisstionApi = {
  Adm_InsertUserGroup: (params) => {
    const url = "api/Permission/Adm_InsertUserGroup";
    return axiosClient.post(url, params);
  },
  Adm_GetDatatUserGroup: (params) => {
    const url = "api/Permission/Adm_GetDatatUserGroup";
    return axiosClient.get(url, { params });
  },
  Adm_GetPermistion: (params) => {
    const url = "api/Permission/Adm_GetPermistion";
    return axiosClient.get(url, { params });
  },
  Adm_ChangePermissionStatus: (params) => {
    const url = "api/Permission/Adm_ChangePermissionStatus";
    return axiosClient.get(url, { params });
  },
  Adm_DeleteUserGroup: (params) => {
    const url = "api/Permission/Adm_DeleteUserGroup";
    return axiosClient.post(url, params);
  },

  //////////// lấy danh sách ngươi dùng chưa có nhóm, có nhóm, phân quyền
  Adm_GetDataEmpNoGroup: (params) => {
    const url = "api/Permission/Adm_GetDataEmpNoGroup";
    return axiosClient.get(url, { params });
  },
  Adm_GetDataEmpByGroupID: (params) => {
    const url = "api/Permission/Adm_GetDataEmpByGroupID";
    return axiosClient.get(url, { params });
  },

  // thêm - xóa người dùng khỏi nhóm
  Adm_InsertEmpInGroup: (params) => {
    const url = "api/Permission/Adm_InsertEmpInGroup";
    return axiosClient.post(url, params);
  },
  Adm_DeleteEmpInGroup: (params) => {
    const url = "api/Permission/Adm_DeleteEmpInGroup";
    return axiosClient.post(url, params);
  },

  // lấy tất cả các nhóm quyền cảu user đó
  Adm_GetAllPermissionByEmpID: (params) => {
    const url = "api/Permission/Adm_GetAllPermissionByEmpID";
    return axiosClient.get(url, { params });
  },
};

export default permisstionApi;
