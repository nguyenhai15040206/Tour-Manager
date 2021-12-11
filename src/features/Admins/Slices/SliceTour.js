import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tourApi from "../../../apis/TourApi";

// Nguyễn Tấn Hải 20211110
export const Adm_GetTourList = createAsyncThunk(
  "api/Tour/Adm_GetTourList",
  async (values, thunkApi) => {
    try {
      const response = await tourApi.Adm_GetTourList(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const Adm_InsertTour = createAsyncThunk(
  "api/Tour/Adm_InsertTour",
  async (values, thunkApi) => {
    try {
      const response = await tourApi.Adm_InsertTour(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const Adm_UpdateTour = createAsyncThunk(
  "api/Tour/Adm_UpdateTour",
  async (values, thunkApi) => {
    try {
      const response = await tourApi.Adm_UpdateTourById(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);

export const Adm_DeleteTourByIds = createAsyncThunk(
  "api/Tour/Adm_DeleteTourByIds",
  async (values, thunkApi) => {
    try {
      const response = await tourApi.Adm_DeleteTourByIds(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const Adm_GetTourById = createAsyncThunk(
  "api/Tour/Adm_GetTourDetails",
  async (params, thunkApi) => {
    try {
      const response = await tourApi.Adm_GetTourDetails(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const Cli_GetTourDetailsByTourID = createAsyncThunk(
  "api/Tour/Cli_GetTourDetailsByTourID",
  async (params, thunkApi) => {
    try {
      const response = await tourApi.getTourDetails(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: "Tour",
  initialState: {
    tourByID: {},
    dataInsert: {},
    tourList: null,
    loading: "idle",
    error: "",
    Cli_TourDetails: {},
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
    // cập nhật du lieu - TanHai 20211116
    builder.addCase(Adm_UpdateTour.pending, (state) => {
      state.dataInsert = {};
      state.loading = "loading";
    });

    builder.addCase(Adm_UpdateTour.fulfilled, (state, { payload }) => {
      state.dataInsert = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_UpdateTour.rejected, (state, action) => {
      state.dataInsert = {};
      state.loading = "error";
      state.error = action.payload.error;
    });

    // kết thúc cập nhật

    // Xóa
    builder.addCase(Adm_DeleteTourByIds.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_DeleteTourByIds.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_DeleteTourByIds.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload.error;
    });

    // Get tour by id
    builder.addCase(Adm_GetTourById.pending, (state) => {
      state.tourByID = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetTourById.fulfilled, (state, { payload }) => {
      state.tourByID = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetTourById.rejected, (state, action) => {
      state.tourByID = {};
      state.loading = "error";
      state.error = action.payload.error;
    });

    //================== Sử lý dữ liệu Client
    //Get tour ByID
    builder.addCase(Cli_GetTourDetailsByTourID.pending, (state) => {
      state.Cli_TourDetails = {};
      state.loading = "loading";
    });

    builder.addCase(
      Cli_GetTourDetailsByTourID.fulfilled,
      (state, { payload }) => {
        state.Cli_TourDetails = payload;
        state.loading = "loaded";
      }
    );

    builder.addCase(Cli_GetTourDetailsByTourID.rejected, (state, action) => {
      state.Cli_TourDetails = {};
      state.loading = "error";
      state.error = action.payload.error;
    });
  },
});

const { reducer: tourReducer } = tourSlice;
export default tourReducer;
