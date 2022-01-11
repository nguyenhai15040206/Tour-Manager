import axiosClient from "./AxiosClient";

const url = "api/BookingTour";

const bookingTour = {
  Adm_CreateBookingTour: (values) => {
    return axiosClient.post(`${url}/Adm_CreateBookingTour`, values);
  },
  Adm_BookingTourDetails: (params) => {
    return axiosClient.get(`${url}/Adm_BookingTourDetails`, { params });
  },

  Adm_SendEmailAfterBooking: (params) => {
    return axiosClient.get(`${url}/Adm_SendEmailAfterBooking`, { params });
  },
  Adm_AcceptBooking: (params) => {
    return axiosClient.put(`${url}/Adm_AcceptBooking`, params);
  },
  Adm_ExportDataBookingTour: (params) => {
    return axiosClient.get(`${url}/Adm_ExportDataBookingTour`, { params });
  },

  Adm_GetDataBooking: (params) => {
    return axiosClient.post(`${url}/Adm_GetDataBooking`, params);
  },

  //====
  Cli_GetDataBookingByCusomer: (params) => {
    return axiosClient.get(`${url}/Cli_GetBookingByCustomer`, { params });
  },
};

export default bookingTour;
