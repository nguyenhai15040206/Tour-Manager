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
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const imagesUploadSlice = createSlice({
  name: "ImagesUpload",
  initialState: {
    imageTour: "",
    loading: "idled",
    error: "",
  },

  extraReducers: (builder) => {
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
  },
});

const { reducer: imagesUploadReducer } = imagesUploadSlice;
export default imagesUploadReducer;
