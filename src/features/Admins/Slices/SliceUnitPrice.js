import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import unitPriceApi from "../../../apis/UnitPriceApi";

// Nguyễn Tấn Hải 20211125
export const Adm_InsertUnitPrice = createAsyncThunk(
  "api/UnitPrice/Adm_InsertUnitPrice",
  async (values, thunkApi) => {
    try {
      const response = await unitPriceApi.Adm__InsertUnitPrice(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const Adm_DeleteUnitPriceByTourIds = createAsyncThunk(
  "api/UnitPrice/Adm_DeleteUnitPriceByTourIds",
  async (values, thunkApi) => {
    try {
      const response = await unitPriceApi.Adm__DeleteUnitPriceByTourIds(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const unitPriceSlice = createSlice({
  name: "UnitPrice",
  initialState: {
    dataInsert: {},
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    // Them du lieu - TanHai 20211116
    builder.addCase(Adm_InsertUnitPrice.pending, (state) => {
      state.dataInsert = {};
      state.loading = "loading";
    });

    builder.addCase(Adm_InsertUnitPrice.fulfilled, (state, { payload }) => {
      state.dataInsert = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_InsertUnitPrice.rejected, (state, action) => {
      state.dataInsert = {};
      state.loading = "error";
      state.error = action.payload.error;
    });

    // kết thúc thêm

    // Xóa Multi Unit Price by tour ids
    builder.addCase(Adm_DeleteUnitPriceByTourIds.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      Adm_DeleteUnitPriceByTourIds.fulfilled,
      (state, { payload }) => {
        state.loading = "loaded";
      }
    );

    builder.addCase(Adm_DeleteUnitPriceByTourIds.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload.error;
    });

    // kết thúc xóa
  },
});
const { reducer: unitPriceReducer } = unitPriceSlice;
export default unitPriceReducer;
