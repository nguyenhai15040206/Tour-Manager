import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tourDetailsApi from "../../../apis/TourDetailsApi";

// Nguyễn Tấn Hải 20211110

export const Adm_InsertTourDetails = createAsyncThunk(
  "api/TourDetails/Adm_InsertTourDetails",
  async (values, thunkApi) => {
    try {
      const response = await tourDetailsApi.Adm_InsertTourDetails(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.payload.data);
    }
  }
);
export const Adm_UpdateTourDetails = createAsyncThunk(
  "api/TourDetails/Adm_UpdateTourDetails",
  async (values, thunkApi) => {
    try {
      const response = await tourDetailsApi.Adm_UpdateTourDetails(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.payload.data);
    }
  }
);

export const Adm_DeleteTourDetailsByTourIds = createAsyncThunk(
  "api/TourDetails/Adm_DeleteTourDetailsByTourIds",
  async (values, thunkApi) => {
    try {
      const response = await tourDetailsApi.Adm_DeleteTourDetailsByTourIds(
        values
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.payload.data);
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
    // Cap nhat du lieu - TanHai 20211116
    builder.addCase(Adm_UpdateTourDetails.pending, (state) => {
      state.dataInsert = {};
      state.loading = "loading";
    });

    builder.addCase(Adm_UpdateTourDetails.fulfilled, (state, { payload }) => {
      state.dataInsert = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_UpdateTourDetails.rejected, (state, action) => {
      state.dataInsert = {};
      state.loading = "error";
      state.error = action.payload.error;
    });

    // kết thúc thêm

    // Xóa Tour Details Multi row By Tour Ids
    builder.addCase(Adm_DeleteTourDetailsByTourIds.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(
      Adm_DeleteTourDetailsByTourIds.fulfilled,
      (state, { payload }) => {
        state.loading = "loaded";
      }
    );

    builder.addCase(
      Adm_DeleteTourDetailsByTourIds.rejected,
      (state, action) => {
        state.loading = "error";
        state.error = action.payload.error;
      }
    );

    //end
  },
});

const { reducer: tourDetailsReducer } = tourDetailsSlice;
export default tourDetailsReducer;
