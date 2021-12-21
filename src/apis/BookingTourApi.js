import axiosClient from "./AxiosClient";

const url = "api/BookingTour";

const bookingTour = {
  Adm_CreateBookingTour: (values) => {
    return axiosClient.post(`${url}/Adm_CreateBookingTour`, values);
  },
  Adm_BookingTourDetails: (params) => {
    return axiosClient.get(`${url}/Adm_BookingTourDetails`, { params });
  },
};

export default bookingTour;
