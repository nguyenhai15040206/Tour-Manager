import axiosClient from "./AxiosClient";

const url = "api/ImagesUpload";
const imagesUpload = {
  Adm_UploadImageTour: (data) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return axiosClient.post(`${url}/Adm_UploadImageTour`, data, config);
  },
  Adm_UploadImageTourGuide: (data) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return axiosClient.post(`${url}/Adm_UploadImageTourGuide`, data, config);
  },
  UploadImageCompany: (data) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return axiosClient.post(`${url}/UploadImageCompany`, data, config);
  },
  Adm_UploadImageTouristAttr: (data) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return axiosClient.post(`${url}/UploadImagesTouristAttr`, data, config);
  },
  Adm_UploadImageEmployee: (data) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return axiosClient.post(`${url}/Adm_UploadImageEmployee`, data, config);
  },
  Adm_UploadImageNews: (data) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return axiosClient.post(`${url}/Adm_UploadImageNews`, data, config);
  },
};

export default imagesUpload;
