import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addressApi } from "./../../../apis/AddressApi";

// Nguyễn Tấn Hải - 20211115

export const Adm_GetProvince = createAsyncThunk(
  "api/Province/Adm_GetProvince",
  async (values, thunkApi) => {
    try {
      const response = await addressApi.Adm_GetProvince(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
      });
    }
  }
);
export const Adm_GetProvinceByRegions = createAsyncThunk(
  "api/Province/Adm_GetProvinceByRegions",
  async (values, thunkApi) => {
    try {
      const response = await addressApi.Adm_GetProvinceByRegions(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
      });
    }
  }
);

export const Adm_GetProvinceAndSearch = createAsyncThunk(
  "api/Province/Adm_GetProvinceAndSearch",
  async (values, thunkApi) => {
    try {
      const response = await addressApi.Adm_GetProvinceAndSearch(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
      });
    }
  }
);

const addressSlice = createSlice({
  name: "Address",
  initialState: {
    data: null,
    ProvinceByRegions: [],
    dataSearch: [],
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(Adm_GetProvince.pending, (state) => {
      state.data = [];
      state.loading = "loading";
    });

    builder.addCase(Adm_GetProvince.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetProvince.rejected, (state, action) => {
      state.loading = "error";
      state.data = [];
      state.error = action.payload.error;
    });

    //=========
    builder.addCase(Adm_GetProvinceByRegions.pending, (state) => {
      state.ProvinceByRegions = [];
      state.loading = "loading";
    });

    builder.addCase(
      Adm_GetProvinceByRegions.fulfilled,
      (state, { payload }) => {
        state.ProvinceByRegions = payload;
        state.loading = "loaded";
      }
    );

    builder.addCase(Adm_GetProvinceByRegions.rejected, (state, action) => {
      state.loading = "error";
      state.ProvinceByRegions = [];
      state.error = action.payload.error;
    });

    ///
    builder.addCase(Adm_GetProvinceAndSearch.pending, (state) => {
      state.dataSearch = null;
      state.loading = "loading";
    });
    builder.addCase(
      Adm_GetProvinceAndSearch.fulfilled,
      (state, { payload }) => {
        state.dataSearch = payload;
        state.loading = "loaded";
      }
    );
    builder.addCase(Adm_GetProvinceAndSearch.rejected, (state, action) => {
      state.dataSearch = null;
      state.loading = "error";
      state.error = action.error.message;
    });
  },
});

const { reducer: addressReducer } = addressSlice;
export default addressReducer;
