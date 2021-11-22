import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tourDetailsApi from "../../../apis/TourDetailsApi";

// Nguyễn Tấn Hải 20211110

export const Adm_InsertTourDetails = createAsyncThunk(
  "api/TourDetails/Adm_InsertTourDetails",
  async (values, thunkApi) => {
    try {
      const token = "";
      const response = await tourDetailsApi.Adm_InsertTourDetails(
        values,
        token
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const tourDetailsSlice = createSlice({
  name: "TourDetails",
  initialState: {
    dataInsert: {},
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    // Them du lieu - TanHai 20211116
    builder.addCase(Adm_InsertTourDetails.pending, (state) => {
      state.dataInsert = {};
      state.loading = "loading";
    });

    builder.addCase(Adm_InsertTourDetails.fulfilled, (state, { payload }) => {
      state.dataInsert = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_InsertTourDetails.rejected, (state, action) => {
      state.dataInsert = {};
      state.loading = "error";
      state.error = action.payload.error;
    });

    // kết thúc thêm
  },
});

const { reducer: tourDetailsReducer } = tourDetailsSlice;
export default tourDetailsReducer;
