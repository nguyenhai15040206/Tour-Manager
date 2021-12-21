import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tourGuideApi from "./../../../apis/TourGuideApi";

export const Adm_GetDataTourGuide = createAsyncThunk(
  "api/TourGuide/Adm_GetDataTourGuide",
  async (values, thunkApi) => {
    try {
      const response = await tourGuideApi.Adm_GetDataTourGuide(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const Adm_CreateTourGuide = createAsyncThunk(
  "api/TourGuide/Adm_CreateTourGuide",
  async (values, thunkApi) => {
    try {
      const response = await tourGuideApi.Adm_CreateTourGuide(values);
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

export const Adm_GetDataTourGuidCondition = createAsyncThunk(
  "api/TourGuide/Adm_GetDataTourGuidCondition",
  async (values, thunkApi) => {
    try {
      const response = await tourGuideApi.Adm_GetDataTourGuidCondition(values);
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

const tourGuideSlice = createSlice({
  name: "TourGuide",
  initialState: {
    dataTourGuide: null,
    dataCondition: [],
    loading: "idle",
    error: "",
  },
  extraReducers: (builder) => {
    ///get
    builder.addCase(Adm_GetDataTourGuide.pending, (state) => {
      state.dataTourGuide = null;
      state.loading = "loading";
    });
    builder.addCase(Adm_GetDataTourGuide.fulfilled, (state, { payload }) => {
      state.dataTourGuide = payload;
      state.loading = "loaded";
    });
    builder.addCase(Adm_GetDataTourGuide.rejected, (state, action) => {
      state.dataTourGuide = [];
      state.loading = "error";
      state.error = action.error.error;
    });
    ///create
    builder.addCase(Adm_CreateTourGuide.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_CreateTourGuide.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });
    builder.addCase(Adm_CreateTourGuide.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });
    ///get tour guide condition
    builder.addCase(Adm_GetDataTourGuidCondition.pending, (state) => {
      state.dataCondition = [];
      state.loading = "loading";
    });
    builder.addCase(
      Adm_GetDataTourGuidCondition.fulfilled,
      (state, { payload }) => {
        state.dataCondition = payload;
        state.loading = "loaded";
      }
    );
    builder.addCase(Adm_GetDataTourGuidCondition.rejected, (state, action) => {
      state.dataCondition = [];
      state.loading = "error";
      state.error = action.error.error;
    });
  },
});

const { reducer: tourGuideReducer } = tourGuideSlice;
export default tourGuideReducer;
