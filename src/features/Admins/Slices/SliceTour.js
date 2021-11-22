import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tourApi from "../../../apis/TourApi";

// Nguyễn Tấn Hải 20211110
export const Adm_GetTourList = createAsyncThunk(
  "api/Tour/Adm_GetTourList",
  async (values, thunkApi) => {
    try {
      const token = "";
      const response = await tourApi.Adm_GetTourList(values, token);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const Adm_InsertTour = createAsyncThunk(
  "api/Tour/Adm_InsertTour",
  async (values, thunkApi) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUb3VyTWFuYWdlckFzc2Nlc3NUb2tlbiIsImp0aSI6IjNiNGM3NjFmLWE1MmItNDBkYS1iZTAxLTk0NDMxYTkyZWNjNSIsImlhdCI6IjExLzE4LzIwMjEgNDo0NTo1NCBQTSIsIkVtcElEIjoiMTEiLCJFbXBOYW1lIjoiTmd1eeG7hW4gVOG6pW4gSOG6o2kiLCJQaG9uZU51bWJlciI6IjAzNTc4NjY4NDgiLCJFbWFpbCI6Im5ndXllbmhhaTE1MDQwMjA2QGdtYWlsLmNvbSIsImV4cCI6MTYzNzI2MTE1NCwiaXNzIjoiVG91ck1hbmFnZXJBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IlRvdXJNYW5hZ2VyU2VydmljZVBvc3RtYW5DbGllbnQifQ.lSJRxEaKKaykNWHg33dvfFSfpLRDtCNs3qKsFo9La1M";
      const response = await tourApi.Adm_InsertTour(values, token);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const tourSlice = createSlice({
  name: "Tour",
  initialState: {
    dataInsert: {},
    tourList: null,
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    // laays duwx lieu
    builder.addCase(Adm_GetTourList.pending, (state) => {
      state.tourList = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetTourList.fulfilled, (state, { payload }) => {
      state.tourList = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetTourList.rejected, (state, action) => {
      state.tourList = [];
      state.loading = "error";
      state.error = action.payload?.error;
    });

    // Them du lieu - TanHai 20211116
    builder.addCase(Adm_InsertTour.pending, (state) => {
      state.dataInsert = {};
      state.loading = "loading";
    });

    builder.addCase(Adm_InsertTour.fulfilled, (state, { payload }) => {
      state.dataInsert = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_InsertTour.rejected, (state, action) => {
      state.dataInsert = {};
      state.loading = "error";
      state.error = action.payload.error;
    });

    // kết thúc thêm
  },
});

const { reducer: tourReducer } = tourSlice;
export default tourReducer;
