import axiosClient from "./AxiosClient";

const url = "api/ImagesUpload";
const imagesUpload = {
  Adm_UploadImageTour: (data) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return axiosClient.post(`${url}/Adm_UploadImageTour`, data, config);
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
};

export default imagesUpload;
