import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeApi from "../../../apis/EmplyeeApi";

// Nguyễn Tấn Hải [23/10/2021] // Xử lý login

export const LoginEmp = createAsyncThunk(
  "api/Employee/Login",
  async (values, thunkApi) => {
    try {
      const response = await employeeApi.Login(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

///get employee
export const Adm_GetEmployeeList = createAsyncThunk(
  "api/Employee/Adm_GetEmployee",
  async (values, thunkApi) => {
    try {
      const response = await employeeApi.Adm_GetEmployeeList(values);
      console.log(response);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

///get employee by id
export const Adm_GetEmployeeById = createAsyncThunk(
  "api/Employee/Adm_getEmployeeById",
  async (params, thunkApi) => {
    try {
      const response = await employeeApi.Adm_GetEmployeeById(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

///Post a employee
export const Adm_CreateEmployee = createAsyncThunk(
  "api/Employee/Adm_CreateEmployee",
  async (values, thunkApi) => {
    try {
      const response = await employeeApi.Adm_CreateEmployee(values);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

///Delete employee
export const Adm_DeleteEmployee = createAsyncThunk(
  "api/Employee/Adm_DeleteEmployee",
  async (values, thunkApi) => {
    try {
      const response = await employeeApi.Adm_DeleteEmployee(values);
      console.log("response.data", response.data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

//edit information employee
export const Adm_EditEmployee = createAsyncThunk(
  "api/employee/Adm_EditEmployee",
  async (values, thunkApi) => {
    try {
      const response = await employeeApi.Adm_UpdateEmployee(values);
      return response;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

const employeeSlice = createSlice({
  name: "Employee",
  initialState: {
    employeeByID: null,
    dataEmpList: null,
    dataEmp: JSON.stringify(localStorage.getItem("accessTokenEmp")) || {},
    loading: "idle",
    error: "",
  },

  // start Login
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
      state.error = action.error.error;
    });

    //end

    //get employee list
    builder.addCase(Adm_GetEmployeeList.pending, (state) => {
      state.dataEmpList = null;
      state.loading = "loading";
    });
    builder.addCase(Adm_GetEmployeeList.fulfilled, (state, { payload }) => {
      state.dataEmpList = payload;
      state.loading = "loaded";
    });
    builder.addCase(Adm_GetEmployeeList.rejected, (state, action) => {
      state.dataEmpList = [];
      state.loading = "error";
      state.error = action.error.message;
    });

    ///get employee by id
    builder.addCase(Adm_GetEmployeeById.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_GetEmployeeById.fulfilled, (state, { payload }) => {
      state.employeeByID = payload;
      state.loading = "loaded";
    });
    builder.addCase(Adm_GetEmployeeById.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });

    ///create employee
    builder.addCase(Adm_CreateEmployee.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_CreateEmployee.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });
    builder.addCase(Adm_CreateEmployee.rejected, (state, action) => {
      // rớt ra lỗi, em set luôn listData = [] thif table khong co du lieu, maf trong khi table minh chua tac dong toi
      state.loading = "error";
      state.error = action.error.message;
    });

    ///delete employee
    builder.addCase(Adm_DeleteEmployee.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_DeleteEmployee.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });
    builder.addCase(Adm_DeleteEmployee.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });

    //edit
    builder.addCase(Adm_EditEmployee.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_EditEmployee.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });
    builder.addCase(Adm_EditEmployee.rejected, (state, action) => {
      state.loading = "error"; //???
      state.error = action.error.error;
    });
  },
});

const { reducer: employeeReducer } = employeeSlice;
export default employeeReducer;
