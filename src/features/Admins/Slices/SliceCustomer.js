import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerApi from "../../../apis/CustomerApi";

// Nguyễn Tấn Hải [23/10/2021] // Xử lý Login
export const GetToken = createAsyncThunk(
  "api/Customer",
  async (values, thunkApi) => {
    try {
      const response = await customerApi.PostToken(values);
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
export const Cli_GetCustomerInfo = createAsyncThunk(
  "api/Customer/Cli_GetDataInfo",
  async (values, thunkApi) => {
    try {
      const response = await customerApi.Cli_GetCustomerInfo(values);
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
///
export const Cli_UpdateCustomer = createAsyncThunk(
  "api/Customer/Cli_UpdateCustomer",
  async (values, thunkApi) => {
    try {
      const response = await customerApi.Cli_UpdateCustomer(values);
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
/// Admin
export const Adm_GetDataCustomerList = createAsyncThunk(
  "api/Customer/Adm_GetDataCustomerList",
  async (values, thunkApi) => {
    try {
      const response = await customerApi.Adm_GetDataCustomerList(values);
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
export const Adm_DeleteCustomer = createAsyncThunk(
  "api/Customer/Adm_DeleteCustomer",
  async (values, thunkApi) => {
    try {
      const response = await customerApi.Adm_DeleteCustomer(values);
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
export const Adm_RegisterCustomer = createAsyncThunk(
  "api/Customer/Adm_RegisterCustomer",
  async (values, thunkApi) => {
    try {
      const response = await customerApi.Adm_RegisterCustomer(values);
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

const customerSlice = createSlice({
  name: "Customer",
  initialState: {
    dataCustomer: {},
    dataCustomerInfo: {},
    dataCustomer: null,
    loading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    //
    builder.addCase(Adm_DeleteCustomer.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_DeleteCustomer.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_DeleteCustomer.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
    //
    builder.addCase(Adm_RegisterCustomer.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_RegisterCustomer.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_RegisterCustomer.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
    //
    builder.addCase(Adm_GetDataCustomerList.pending, (state) => {
      state.dataCustomer = null;
      state.loading = "loading";
    });
    builder.addCase(Adm_GetDataCustomerList.fulfilled, (state, { payload }) => {
      state.dataCustomer = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetDataCustomerList.rejected, (state, action) => {
      state.dataCustomer = [];
      state.loading = "error";
      state.error = action.error.message;
    });
    //
    builder.addCase(Cli_UpdateCustomer.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Cli_UpdateCustomer.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Cli_UpdateCustomer.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });

    //
    builder.addCase(Cli_GetCustomerInfo.pending, (state) => {
      state.dataCustomerInfo = {};
      state.loading = "loading";
    });
    builder.addCase(Cli_GetCustomerInfo.fulfilled, (state, { payload }) => {
      state.dataCustomerInfo = payload;
      state.loading = "loaded";
    });

    builder.addCase(Cli_GetCustomerInfo.rejected, (state, action) => {
      state.dataCustomerInfo = {};
      state.loading = "error";
      state.error = action.error.message;
    });

    //====
    builder.addCase(GetToken.pending, (state) => {
      state.dataCustomer = {};
      state.loading = "loading";
    });
    builder.addCase(GetToken.fulfilled, (state, { payload }) => {
      state.dataCustomer = payload;
      state.loading = "loaded";
    });

    builder.addCase(GetToken.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
  },
});

const { reducer: customerReducer, actions } = customerSlice;
export const { addCustomer } = actions;
export default customerReducer;
