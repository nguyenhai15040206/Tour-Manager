import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import touristAttractionApi from "../../../apis/TouristAttraction";

// Nguyễn Tấn Hải - 20211114

export const Adm_GetTouristAttr = createAsyncThunk(
  "api/TouristAttraction/GetTouristAttrList",
  async (values, thunkApi) => {
    try {
      const response = await touristAttractionApi.Adm__GetTouristAttrList(
        values
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

///theem
export const Adm_CreateTourAttr = createAsyncThunk(
  "api/TouristAttraction/Admin_CreateTourAttraction",
  async (values, thunkApi) => {
    try {
      await touristAttractionApi.Adm_CreateTouristAttr(values);
    } catch (err) {
      return thunkApi.rejectWithValue({ error: err.message });
    }
  }
);

///xóa một địa điểm du lịch
export const Adm_DeleteTouristAttr = createAsyncThunk(
  "api/TouristAttraction/Adm_DeleteTouristAttr",
  async (values, thunkApi) => {
    try {
      await touristAttractionApi.Adm_DeleteTouristAttrList(values);
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const touristAttrSlice = createSlice({
  name: "TouristAttraction",
  initialState: {
    data: [],
    loading: "idle",
    error: "",
  },

  ///load
  extraReducers: (builder) => {
    builder.addCase(Adm_GetTouristAttr.pending, (state) => {
      state.data = [];
      state.loading = "loading";
    });

    builder.addCase(Adm_GetTouristAttr.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetTouristAttr.rejected, (state, action) => {
      state.loading = "error";
      state.data = [];
      state.error = action.error.message;
    });

    ///them
    builder.addCase(Adm_CreateTourAttr.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_CreateTourAttr.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });
    builder.addCase(Adm_CreateTourAttr.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });

    ///xóa
    builder.addCase(Adm_DeleteTouristAttr.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_DeleteTouristAttr.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });
    builder.addCase(Adm_DeleteTouristAttr.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });
  },
});

const { reducer: touristAttrReducer } = touristAttrSlice;
export default touristAttrReducer;
