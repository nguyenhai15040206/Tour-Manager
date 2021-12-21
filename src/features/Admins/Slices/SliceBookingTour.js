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

const bookingTourSlice = createSlice({
  name: "BookingTour",
  initialState: {
    dataInsert: {},
    dataDetails: {},
    loading: "idle",
    error: "",
  },
  extraReducers: (builder) => {
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
  },
});

const { reducer: bookingTourReducer } = bookingTourSlice;
export default bookingTourReducer;
