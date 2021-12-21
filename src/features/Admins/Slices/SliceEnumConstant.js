import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enumConstantApi from "../../../apis/EnumConstantApi";

// Nguyễn Tấn Hải [23/10/2021] // Get dữ liệu từ enum

///get employee
export const Adm_GetEnumConstantCbo = createAsyncThunk(
  "api/EnumConstant/Adm_GetEnumConstantCbo",
  async (values, thunkApi) => {
    try {
      const response = await enumConstantApi.Adm_GetEnumConstantCbo(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);
///get employee
export const Adm_GetEnumList = createAsyncThunk(
  "api/EnumConstant/Adm_GetEnumList",
  async (values, thunkApi) => {
    try {
      const response = await enumConstantApi.Adm_GetEnumList(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);

const enumConstantSlice = createSlice({
  name: "EnumConstant",
  initialState: {
    dataCbo: [],
    data: [],
    loading: "idle",
    error: "",
  },

  // start Login
  extraReducers: (builder) => {
    // get enum constant to cbo
    builder.addCase(Adm_GetEnumConstantCbo.pending, (state) => {
      state.dataCbo = [];
      state.loading = "loading";
    });

    builder.addCase(Adm_GetEnumConstantCbo.fulfilled, (state, { payload }) => {
      state.dataCbo = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetEnumConstantCbo.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });
    //end
    // get enum constant list
    builder.addCase(Adm_GetEnumList.pending, (state) => {
      state.data = [];
      state.loading = "loading";
    });

    builder.addCase(Adm_GetEnumList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetEnumList.rejected, (state, action) => {
      state.data = "error";
      state.error = action.error.error;
    });
    //end
  },
});

const { reducer: enumConstantReducer } = enumConstantSlice;
export default enumConstantReducer;
