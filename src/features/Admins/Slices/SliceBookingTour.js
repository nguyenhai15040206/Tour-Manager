import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingTourApi from "../../../apis/BookingTourApi";

///get employee
export const Adm_BookingTour = createAsyncThunk(
  "api/BookingTour/Adm_GetEmployee",
  async (values, thunkApi) => {
    try {
      const response = await bookingTourApi.Adm_CreateBookingTour(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

//================== phiếu xác nhận booking tour
export const Adm_BookingTourDetails = createAsyncThunk(
  "api/BookingTour/Adm_BookingTourDetails",
  async (values, thunkApi) => {
    try {
      const response = await bookingTourApi.Adm_BookingTourDetails(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);
//================== Gửi mail khi booking này được thanh toán
export const Adm_SendEmailAfterBooking = createAsyncThunk(
  "api/BookingTour/Adm_SendEmailAfterBooking",
  async (values, thunkApi) => {
    try {
      const response = await bookingTourApi.Adm_SendEmailAfterBooking(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);
//================== Xác nhận thanh toán
export const Adm_AcceptBooking = createAsyncThunk(
  "api/BookingTour/Adm_AcceptBooking",
  async (values, thunkApi) => {
    try {
      const response = await bookingTourApi.Adm_AcceptBooking(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);
//================== Export booking
export const Adm_ExportDataBookingTour = createAsyncThunk(
  "api/BookingTour/Adm_ExportDataBookingTour",
  async (values, thunkApi) => {
    try {
      const response = await bookingTourApi.Adm_ExportDataBookingTour(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);
//================== Lấy danh sách booking
export const Adm_GetDataBooking = createAsyncThunk(
  "api/BookingTour/Adm_GetDataBooking",
  async (values, thunkApi) => {
    try {
      const response = await bookingTourApi.Adm_GetDataBooking(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

const bookingTourSlice = createSlice({
  name: "BookingTour",
  initialState: {
    dataInsert: {},
    dataDetails: {},
    dataBooking: [],
    loading: "idle",
    error: "",
  },
  extraReducers: (builder) => {
    // lấy danh sách booking
    builder.addCase(Adm_ExportDataBookingTour.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(
      Adm_ExportDataBookingTour.fulfilled,
      (state, { payload }) => {
        state.loading = "loaded";
      }
    );

    builder.addCase(Adm_ExportDataBookingTour.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });
    // lấy danh sách booking
    builder.addCase(Adm_GetDataBooking.pending, (state) => {
      state.dataBooking = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetDataBooking.fulfilled, (state, { payload }) => {
      state.dataBooking = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetDataBooking.rejected, (state, action) => {
      state.dataBooking = [];
      state.loading = "error";
      state.error = action.error.error;
    });
    // đặt tour
    builder.addCase(Adm_BookingTour.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_BookingTour.fulfilled, (state, { payload }) => {
      state.dataInsert = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_BookingTour.rejected, (state, action) => {
      state.dataInsert = {};
      state.loading = "error";
      state.error = action.error.error;
    });

    //end
    builder.addCase(Adm_BookingTourDetails.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_BookingTourDetails.fulfilled, (state, { payload }) => {
      state.dataDetails = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_BookingTourDetails.rejected, (state, action) => {
      state.dataDetails = {};
      state.loading = "error";
      state.error = action.error.error;
    });

    //======= send mail
    builder.addCase(Adm_SendEmailAfterBooking.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      Adm_SendEmailAfterBooking.fulfilled,
      (state, { payload }) => {
        state.loading = "loaded";
      }
    );

    builder.addCase(Adm_SendEmailAfterBooking.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });

    //======= xác nhận thaqnh toán
    builder.addCase(Adm_AcceptBooking.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_AcceptBooking.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_AcceptBooking.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });
  },
});

const { reducer: bookingTourReducer } = bookingTourSlice;
export default bookingTourReducer;
