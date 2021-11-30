import axiosClient from "./AxiosClient";

const url = "api/ImagesUpload";
const imagesUpload = {
  Adm_UploadImageTour: (data) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return axiosClient.post(`${url}/Adm_UploadImageTour`, data, config);
  },
};

export default imagesUpload;
