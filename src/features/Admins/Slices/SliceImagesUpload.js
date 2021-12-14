import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import imagesUpload from "../../../apis/UploadImages";
// Nguyễn Tấn Hải - 20211126
export const Adm_UploadImageTour = createAsyncThunk(
  "api/ImagesUpload/Adm_UploadImageTour",
  async (data, thunkApi) => {
    try {
      const response = await imagesUpload.Adm_UploadImageTour(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);
export const UploadImageCompany = createAsyncThunk(
  "api/ImagesUpload/UploadImageCompany",
  async (data, thunkApi) => {
    try {
      const response = await imagesUpload.UploadImageCompany(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);
export const Adm_UploadImageTouristAttr = createAsyncThunk(
  "api/ImagesUpload/Adm_UploadImageTouristAttr",
  async (data, thunkApi) => {
    try {
      const response = await imagesUpload.Adm_UploadImageTouristAttr(data);
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

const imagesUploadSlice = createSlice({
  name: "ImagesUpload",
  initialState: {
    imageTour: "",
    imageCompany: "",
    arrayImagesTourist: [],
    loading: "idled",
    error: "",
  },

  extraReducers: (builder) => {
    // upload image tour
    builder.addCase(Adm_UploadImageTour.pending, (state) => {
      state.imageTour = "";
      state.loading = "loading";
    });
    builder.addCase(Adm_UploadImageTour.fulfilled, (state, { payload }) => {
      state.imageTour = payload;
      state.loading = "loaded";
    });
    builder.addCase(Adm_UploadImageTour.rejected, (state, { payload }) => {
      state.loading = "error";
      state.imageTour = "";
      state.error = payload;
    });
    //end

    // upload image company
    builder.addCase(UploadImageCompany.pending, (state) => {
      state.imageCompany = "";
      state.loading = "loading";
    });
    builder.addCase(UploadImageCompany.fulfilled, (state, { payload }) => {
      state.imageCompany = payload;
      state.loading = "loaded";
    });
    builder.addCase(UploadImageCompany.rejected, (state, { payload }) => {
      state.loading = "error";
      state.imageCompany = "";
      state.error = payload;
    });
    //end
    // upload multi images tourist attraction
    builder.addCase(Adm_UploadImageTouristAttr.pending, (state) => {
      state.arrayImagesTourist = [];
      state.loading = "loading";
    });
    builder.addCase(
      Adm_UploadImageTouristAttr.fulfilled,
      (state, { payload }) => {
        state.arrayImagesTourist = payload;
        state.loading = "loaded";
      }
    );
    builder.addCase(
      Adm_UploadImageTouristAttr.rejected,
      (state, { payload }) => {
        state.loading = "error";
        state.arrayImagesTourist = [];
        state.error = payload;
      }
    );
    //end
  },
});

const { reducer: imagesUploadReducer } = imagesUploadSlice;
export default imagesUploadReducer;
