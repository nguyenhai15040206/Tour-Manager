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
        message: error.response.data,
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
        message: error.response.data,
      });
    }
  }
);
///Admin
export const Adm_GetDataEnumListByType = createAsyncThunk(
  "api/EnumConstant/Adm_GetDataEnumListByType",
  async (values, thunkApi) => {
    try {
      const response = await enumConstantApi.Adm_GetDataEnumListByType(values);
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
export const Adm_InsertCatEnum = createAsyncThunk(
  "api/EnumConstant/Adm_InsertCatEnum",
  async (values, thunkApi) => {
    try {
      const response = await enumConstantApi.Adm_InsertCatEnum(values);
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

//==
export const Adm_UpdateCatEnum = createAsyncThunk(
  "api/EnumConstant/Adm_UpdateCatEnum",
  async (values, thunkApi) => {
    try {
      const response = await enumConstantApi.Adm_UpdateCatEnum(values);
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
export const Adm_GetEnumIDetails = createAsyncThunk(
  "api/EnumConstant/Adm_GetEnumIDetails",
  async (values, thunkApi) => {
    try {
      const response = await enumConstantApi.Adm_GetEnumIDetails(values);
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

//====
export const Adm_DeleteCatEnum = createAsyncThunk(
  "api/EnumConstant/Adm_DeleteCatEnum",
  async (values, thunkApi) => {
    try {
      const response = await enumConstantApi.Adm_DeleteCatEnum(values);
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

const enumConstantSlice = createSlice({
  name: "EnumConstant",
  initialState: {
    dataCbo: [],
    data: [],
    loading: "idle",
    error: "",
    dataDetails: {},
    DataEnumByType: [],
  },

  // start Login
  extraReducers: (builder) => {
    // thêm
    builder.addCase(Adm_DeleteCatEnum.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_DeleteCatEnum.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_DeleteCatEnum.rejected, (state, action) => {
      state.loading = "error";
    });
    // thêm
    builder.addCase(Adm_UpdateCatEnum.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_UpdateCatEnum.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_UpdateCatEnum.rejected, (state, action) => {
      state.loading = "error";
    });
    // thêm
    builder.addCase(Adm_GetEnumIDetails.pending, (state) => {
      state.dataDetails = {};
      state.loading = "loading";
    });

    builder.addCase(Adm_GetEnumIDetails.fulfilled, (state, { payload }) => {
      state.dataDetails = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetEnumIDetails.rejected, (state, action) => {
      state.dataDetails = {};
      state.loading = "error";
    });
    // thêm
    builder.addCase(Adm_InsertCatEnum.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_InsertCatEnum.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_InsertCatEnum.rejected, (state, action) => {
      state.loading = "error";
    });
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
    });
    //end
    // get enum constant list
    builder.addCase(Adm_GetDataEnumListByType.pending, (state) => {
      state.DataEnumByType = [];
      state.loading = "loading";
    });

    builder.addCase(
      Adm_GetDataEnumListByType.fulfilled,
      (state, { payload }) => {
        state.DataEnumByType = payload;
        state.loading = "loaded";
      }
    );

    builder.addCase(Adm_GetDataEnumListByType.rejected, (state, action) => {
      state.DataEnumByType = [];
      state.data = "error";
    });
    //end
  },
});

const { reducer: enumConstantReducer } = enumConstantSlice;
export default enumConstantReducer;
