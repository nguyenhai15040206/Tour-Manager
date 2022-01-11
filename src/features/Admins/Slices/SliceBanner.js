import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bannerApi from "../../../apis/BannerApi";

// Nguyễn Tấn Hải [23/10/2021] // Get dữ liệu từ enum

///Admin
export const Adm_GetDataBanner = createAsyncThunk(
  "api/Banner/Adm_GetDataBanner",
  async (values, thunkApi) => {
    try {
      const response = await bannerApi.Adm_GetDataBanner(values);
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
///Admin
export const Adm_BannerDetails = createAsyncThunk(
  "api/Banner/Adm_BannerDetails",
  async (values, thunkApi) => {
    try {
      const response = await bannerApi.Adm_BannerDetails(values);
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

//====
export const Adm_InsertBanner = createAsyncThunk(
  "api/Banner/Adm_InsertBanner",
  async (values, thunkApi) => {
    try {
      const response = await bannerApi.Adm_InsertBanner(values);
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
export const Adm_DeleteBanner = createAsyncThunk(
  "api/Banner/Adm_DeleteBanner",
  async (values, thunkApi) => {
    try {
      const response = await bannerApi.Adm_DeleteBanner(values);
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
export const Adm_UpdateBanner = createAsyncThunk(
  "api/Banner/Adm_UpdateBanner",
  async (values, thunkApi) => {
    try {
      const response = await bannerApi.Adm_UpdateBanner(values);
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

const bannerSlice = createSlice({
  name: "Banner",
  initialState: {
    data: [],
    loading: "idle",
    error: "",
  },

  // start Login
  extraReducers: (builder) => {
    // thêm
    builder.addCase(Adm_UpdateBanner.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_UpdateBanner.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_UpdateBanner.rejected, (state, action) => {
      state.loading = "error";
    });
    // thêm
    builder.addCase(Adm_BannerDetails.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_BannerDetails.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_BannerDetails.rejected, (state, action) => {
      state.loading = "error";
    });
    // thêm
    builder.addCase(Adm_DeleteBanner.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_DeleteBanner.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_DeleteBanner.rejected, (state, action) => {
      state.loading = "error";
    });
    // thêm
    builder.addCase(Adm_InsertBanner.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_InsertBanner.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_InsertBanner.rejected, (state, action) => {
      state.loading = "error";
    });

    // thêm
    builder.addCase(Adm_GetDataBanner.pending, (state) => {
      state.data = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetDataBanner.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetDataBanner.rejected, (state, action) => {
      state.data = {};
      state.loading = "error";
    });
  },
});

const { reducer: bannerReducer } = bannerSlice;
export default bannerReducer;
