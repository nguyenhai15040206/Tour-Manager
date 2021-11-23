import axiosClient from "./AxiosClient";

///Thái Trần Kiều Diễm - xử lý employee
const url = "api/Employee";
const employeeApi = {
  Login: (emp) => {
    const url = "api/Employee/AccessToken";
    return axiosClient.post(url, emp);
  },

  ///lấy danh sách nhân viên kèm các thông tin search
  Adm_GetEmployeeList: (params) => {
    return axiosClient.post(`${url}/Adm_GetDataEmployeeList`, params);
  },

  //thêm một nhân viên
  Adm_CreateEmployee: (params) => {
    return axiosClient.post(`${url}/Adm_CreateEmployee`, params);
  },

  //get thông tin nhân viên theo mã
  Adm_GetEmployeeById: (empId) => {
    return axiosClient.get(`${url}/Adm_getEmployeeById`, empId);
  },

  //Update thông tin một nhân viên
  Adm_UpdateEmployee: (params) => {
    return axiosClient.put(`${url}/Adm_UpdateEmployee`, params);
  },

  ///Xóa một nhân viên
  Adm_DeleteEmployee: (empId) => {
    return axiosClient.put(`${url}/Adm_DeleteEmployee`, empId);
  },
};
export default employeeApi;
