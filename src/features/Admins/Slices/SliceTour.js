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

const tourSlice = createSlice({
  name: "Tour",
  initialState: {
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
      state.error = action.error.message;
    });
  },
});

const { reducer: tourReducer } = tourSlice;
export default tourReducer;
