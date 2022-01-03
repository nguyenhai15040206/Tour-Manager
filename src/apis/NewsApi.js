import axiosClient from "./AxiosClient";

const newsApi = {
  // Admin
  Adm_GetDataNewsList: (params) => {
    const url = "api/News/Adm_GetDataNewsList";
    return axiosClient.post(url, params);
  },
  Adm_InsertNews: (params) => {
    const url = "api/News/Adm_InsertNews";
    return axiosClient.post(url, params);
  },
  Adm_UpdateNews: (params) => {
    const url = "api/News/Adm_UpdateNews";
    return axiosClient.put(url, params);
  },
  Adm_DeleteNews: (params) => {
    const url = "api/News/Adm_DeleteNews";
    return axiosClient.put(url, params);
  },

  //
  Adm_GetNewsDetails: (params) => {
    const url = "api/News/Adm_GetNewsDetails";
    return axiosClient.get(url, { params });
  },
  Adm_ActiveNews: (params) => {
    const url = "api/News/Adm_ActiveNews";
    return axiosClient.get(url, { params });
  },

  // Client
  // Admin
  Cli_GetDataNews: (params) => {
    const url = "api/News/Cli_GetDataNews";
    return axiosClient.post(url, params);
  },
  Cli_GetDataNewsDetails: (params) => {
    const url = "api/News/Cli_GetDataNewsDetails";
    return axiosClient.get(url, { params });
  },
};

export default newsApi;
