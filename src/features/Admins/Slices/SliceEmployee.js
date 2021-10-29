import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeApi from "../../../apis/EmplyeeApi";

// Nguyễn Tấn Hải [23/10/2021] // Xử lý login

export const LoginEmp = createAsyncThunk(
  "api/Employee/Login",
  async (values, thunkApi) => {
    try {
      const response = await employeeApi.Login(values);
      localStorage.setItem("accessTokenEmp", response.accessTokenEmp);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const employeeSlice = createSlice({
  name: "Employee",
  initialState: {
    dataEmp: JSON.stringify(localStorage.getItem("accessTokenEmp")) || {},
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(LoginEmp.pending, (state) => {
      state.dataEmp = {};
      state.loading = "loading";
    });

    builder.addCase(LoginEmp.fulfilled, (state, { payload }) => {
      state.dataEmp = payload;
      state.loading = "loaded";
    });

    builder.addCase(LoginEmp.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
  },
});

const { reducer: employeeReducer } = employeeSlice;
export default employeeReducer;
