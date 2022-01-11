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
export const Adm_UploadImageTourGuide = createAsyncThunk(
  "api/ImagesUpload/Adm_UploadImageTourGuide",
  async (data, thunkApi) => {
    try {
      const response = await imagesUpload.Adm_UploadImageTourGuide(data);
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
export const Adm_UploadImageEmployee = createAsyncThunk(
  "api/ImagesUpload/Adm_UploadImageEmployee",
  async (data, thunkApi) => {
    try {
      const response = await imagesUpload.Adm_UploadImageEmployee(data);
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
export const Adm_UploadImageNews = createAsyncThunk(
  "api/ImagesUpload/Adm_UploadImageNews",
  async (data, thunkApi) => {
    try {
      const response = await imagesUpload.Adm_UploadImageNews(data);
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
export const Adm_UploadImageBanner = createAsyncThunk(
  "api/ImagesUpload/Adm_UploadImageBanner",
  async (data, thunkApi) => {
    try {
      const response = await imagesUpload.Adm_UploadImageBanner(data);
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
    imageTourGuide: "",
    imageCompany: "",
    arrayImagesTourist: [],
    imageEmployee: "",
    imageNews: "",
    imageBanner: "",
    loading: "idled",
    error: "",
  },

  extraReducers: (builder) => {
    // upload image banner
    builder.addCase(Adm_UploadImageBanner.pending, (state) => {
      state.imageBanner = "";
      state.loading = "loading";
    });
    builder.addCase(Adm_UploadImageBanner.fulfilled, (state, { payload }) => {
      state.imageBanner = payload;
      state.loading = "loaded";
    });
    builder.addCase(Adm_UploadImageBanner.rejected, (state, { payload }) => {
      state.loading = "error";
      state.imageBanner = "";
    });
    // upload image new
    builder.addCase(Adm_UploadImageNews.pending, (state) => {
      state.imageNews = "";
      state.loading = "loading";
    });
    builder.addCase(Adm_UploadImageNews.fulfilled, (state, { payload }) => {
      state.imageNews = payload;
      state.loading = "loaded";
    });
    builder.addCase(Adm_UploadImageNews.rejected, (state, { payload }) => {
      state.loading = "error";
      state.imageNews = "";
    });
    // upload image emp
    builder.addCase(Adm_UploadImageEmployee.pending, (state) => {
      state.imageEmployee = "";
      state.loading = "loading";
    });
    builder.addCase(Adm_UploadImageEmployee.fulfilled, (state, { payload }) => {
      state.imageEmployee = payload;
      state.loading = "loaded";
    });
    builder.addCase(Adm_UploadImageEmployee.rejected, (state, { payload }) => {
      state.loading = "error";
      state.imageEmployee = "";
    });
    //end
    // upload image tour
    builder.addCase(Adm_UploadImageTourGuide.pending, (state) => {
      state.imageTourGuide = "";
      state.loading = "loading";
    });
    builder.addCase(
      Adm_UploadImageTourGuide.fulfilled,
      (state, { payload }) => {
        state.imageTourGuide = payload;
        state.loading = "loaded";
      }
    );
    builder.addCase(Adm_UploadImageTourGuide.rejected, (state, { payload }) => {
      state.loading = "error";
      state.imageTourGuide = "";
    });
    //end
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
