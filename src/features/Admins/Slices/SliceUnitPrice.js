import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import unitPriceApi from "../../../apis/UnitPriceApi";

// Nguyễn Tấn Hải 20211125
export const Adm_InsertUnitPrice = createAsyncThunk(
  "api/Tour/Adm_InsertUnitPrice",
  async (values, thunkApi) => {
    try {
      const response = await unitPriceApi.Adm__InsertUnitPrice(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
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
  },
});
const { reducer: unitPriceReducer } = unitPriceSlice;
export default unitPriceReducer;
