import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import promotionApi from "../../../apis/PromotionApi";

// Nguyễn Tấn Hải 20211110
export const Adm_GetPromotionList = createAsyncThunk(
  "api/Promotion/Adm_GetPromotionList",
  async (values, thunkApi) => {
    try {
      const response = await promotionApi.Adm_GetPromotionList(values);
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

export const Adm_InsertPromotion = createAsyncThunk(
  "api/Promotion/Adm_InsertPromotion",
  async (values, thunkApi) => {
    try {
      const response = await promotionApi.Adm_InsertPromotion(values);
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
export const Adm_UpdatePromotion = createAsyncThunk(
  "api/Promotion/Adm_UpdateTour",
  async (values, thunkApi) => {
    try {
      const response = await promotionApi.Adm_UpdatePromotionById(values);
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

export const Adm_DeletePromotionByIds = createAsyncThunk(
  "api/Promotion/Adm_DeletePromotionByIds",
  async (values, thunkApi) => {
    try {
      const response = await promotionApi.Adm_DeletePromotionByIds(values);
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
export const Adm_GetPromotionById = createAsyncThunk(
  "api/Promotion/Adm_GetPromotionById",
  async (params, thunkApi) => {
    try {
      const response = await promotionApi.Adm_GetPromotionById(params);
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

// xóa tour hết hạn
export const Adm_DeletePromotionExpired = createAsyncThunk(
  "api/Promotion/Adm_DeletePromotionExpired",
  async (params, thunkApi) => {
    try {
      const response = await promotionApi.Adm_DeletePromotionExpired(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);

const promotionSlice = createSlice({
  name: "Promotion",
  initialState: {
    promotionByID: {},
    dataInsert: {},
    promotionList: null,
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    // Xóa tour hết hạn
    builder.addCase(Adm_DeletePromotionExpired.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(
      Adm_DeletePromotionExpired.fulfilled,
      (state, { payload }) => {
        state.loading = "loaded";
      }
    );

    builder.addCase(Adm_DeletePromotionExpired.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload?.error;
    });

    // laays duwx lieu
    builder.addCase(Adm_GetPromotionList.pending, (state) => {
      state.promotionList = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetPromotionList.fulfilled, (state, { payload }) => {
      state.promotionList = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetPromotionList.rejected, (state, action) => {
      state.promotionList = [];
      state.loading = "error";
      state.error = action.payload?.error;
    });

    // Them du lieu - TanHai 20211116
    builder.addCase(Adm_InsertPromotion.pending, (state) => {
      state.dataInsert = {};
      state.loading = "loading";
    });

    builder.addCase(Adm_InsertPromotion.fulfilled, (state, { payload }) => {
      state.dataInsert = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_InsertPromotion.rejected, (state, action) => {
      state.dataInsert = {};
      state.loading = "error";
      state.error = action.payload.error;
    });

    // kết thúc thêm
    // cập nhật du lieu - TanHai 20211116
    builder.addCase(Adm_UpdatePromotion.pending, (state) => {
      state.dataInsert = {};
      state.loading = "loading";
    });

    builder.addCase(Adm_UpdatePromotion.fulfilled, (state, { payload }) => {
      state.dataInsert = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_UpdatePromotion.rejected, (state, action) => {
      state.dataInsert = {};
      state.loading = "error";
      state.error = action.payload.error;
    });

    // kết thúc cập nhật

    // Xóa
    builder.addCase(Adm_DeletePromotionByIds.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(
      Adm_DeletePromotionByIds.fulfilled,
      (state, { payload }) => {
        state.loading = "loaded";
      }
    );

    builder.addCase(Adm_DeletePromotionByIds.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload.error;
    });

    // Get tour by id
    builder.addCase(Adm_GetPromotionById.pending, (state) => {
      state.promotionByID = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetPromotionById.fulfilled, (state, { payload }) => {
      state.promotionByID = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetPromotionById.rejected, (state, action) => {
      state.promotionByID = {};
      state.loading = "error";
      state.error = action.payload.error;
    });
  },
});

const { reducer: promotionReducer } = promotionSlice;
export default promotionReducer;
