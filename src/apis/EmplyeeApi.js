import axiosClient from "./AxiosClient";

const url = "api/Employee";
const employeeApi = {
  Login: (emp) => {
    const url = "api/Employee/AccessToken";
    return axiosClient.post(url, emp);
  },
  Adm_GetEmployeeList: (params) => {
    return axiosClient.post(`${url}/Adm_GetDataEmployeeList`, params);
  },

  //thêm một nhân viên
  Adm_CreateEmployee: (params) => {
    return axiosClient.post(`${url}/Adm_CreateEmployee`, params);
  },

  //get thông tin nhân viên theo mã
  Adm_GetEmployeeById: (params) => {
    return axiosClient.get(`${url}/Adm_getEmployeeById`, { params });
  },

  //Update thông tin một nhân viên
  Adm_UpdateEmployee: (values) => {
    return axiosClient.put(`${url}/Adm_UpdateEmployee/`, values);
  },

  ///Xóa một nhân viên
  Adm_DeleteEmployee: (empId) => {
    return axiosClient.put(`${url}/Adm_DeleteEmployee`, empId);
  },
};
export default employeeApi;
