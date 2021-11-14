import axiosClient from "./AxiosClient";

const employeeApi = {
  Login: (emp) => {
    const url = "api/Employee/AccessToken";
    return axiosClient.post(url, emp);
  },
};
export default employeeApi;
