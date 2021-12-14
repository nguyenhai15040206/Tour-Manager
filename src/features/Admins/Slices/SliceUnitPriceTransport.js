import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import unitPriceTransportApi from "../../../apis/UnitPriceApi";

// Nguyễn Tấn Hải 20211110
export const Adm_GetDataUnitPrice = createAsyncThunk(
  "api/UnitPriceTransport/Adm_GetDataUnitPrice",
  async (values, thunkApi) => {
    try {
      const response = await unitPriceTransportApi.Adm_GetDataUnitPrice(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);
export const Adm_InsertUnitPrice = createAsyncThunk(
  "api/UnitPriceTransport/Adm_InsertUnitPrice",
  async (values, thunkApi) => {
    try {
      const response = await unitPriceTransportApi.Adm__InsertUnitPrice(values);
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
export const Adm_UpdateUnitPrice = createAsyncThunk(
  "api/UnitPriceTransport/Adm_UpdateUnitPrice",
  async (values, thunkApi) => {
    try {
      const response = await unitPriceTransportApi.Adm_UpdateUnitPrice(values);
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
export const Adm_UnitPriceTransportDetails = createAsyncThunk(
  "api/UnitPriceTransport/Adm_UnitPriceTransportDetails",
  async (values, thunkApi) => {
    try {
      const response =
        await unitPriceTransportApi.Adm_UnitPriceTransportDetails(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);

export const Adm__DeleteUnitPriceByTourIds = createAsyncThunk(
  "api/Promotion/Adm__DeleteUnitPriceByTourIds",
  async (values, thunkApi) => {
    try {
      const response =
        await unitPriceTransportApi.Adm__DeleteUnitPriceByTourIds(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);

const unitPriceTransportSlice = createSlice({
  name: "Promotion",
  initialState: {
    promotionByID: {},
    dataUnitPrice: [],
    dataInsert: {},
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    // Load dữ liệu details - TanHai 20211214
    builder.addCase(Adm_UnitPriceTransportDetails.pending, (state) => {
      state.promotionByID = {};
      state.loading = "loading";
    });

    builder.addCase(
      Adm_UnitPriceTransportDetails.fulfilled,
      (state, { payload }) => {
        state.promotionByID = payload;
        state.loading = "loaded";
      }
    );

    builder.addCase(Adm_UnitPriceTransportDetails.rejected, (state, action) => {
      state.promotionByID = {};
      state.loading = "error";
      state.error = action.payload.error;
    });

    // kết thúc
    // Load dữ liệu - TanHai 20211214
    builder.addCase(Adm_GetDataUnitPrice.pending, (state) => {
      state.dataUnitPrice = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetDataUnitPrice.fulfilled, (state, { payload }) => {
      state.dataUnitPrice = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetDataUnitPrice.rejected, (state, action) => {
      state.dataUnitPrice = [];
      state.loading = "error";
      state.error = action.payload.error;
    });

    // kết thúc
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
    // cập nhật du lieu - TanHai 20211116
    builder.addCase(Adm_UpdateUnitPrice.pending, (state) => {
      state.dataInsert = {};
      state.loading = "loading";
    });

    builder.addCase(Adm_UpdateUnitPrice.fulfilled, (state, { payload }) => {
      state.dataInsert = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_UpdateUnitPrice.rejected, (state, action) => {
      state.dataInsert = {};
      state.loading = "error";
      state.error = action.payload.error;
    });

    // kết thúc cập nhật

    // Xóa
    builder.addCase(Adm__DeleteUnitPriceByTourIds.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(
      Adm__DeleteUnitPriceByTourIds.fulfilled,
      (state, { payload }) => {
        state.loading = "loaded";
      }
    );

    builder.addCase(Adm__DeleteUnitPriceByTourIds.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload.error;
    });
  },
});

const { reducer: unitPriceTransportReducer } = unitPriceTransportSlice;
export default unitPriceTransportReducer;
