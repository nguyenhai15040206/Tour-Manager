import axiosClient from "./AxiosClient";

const employeeApi = {
  Login: (emp) => {
    const url = "/Employee/AccessToken";
    return axiosClient.post(url, emp);
  },
};
export default employeeApi;
