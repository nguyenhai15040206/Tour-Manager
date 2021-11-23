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

///get employee
export const Adm_GetEmployeeList = createAsyncThunk(
  "api/Employee/Adm_GetEmployeeList",
  async (values, thunkApi) => {
    try {
      const response = await employeeApi.Adm_GetEmployeeList(values);
      //console.log(response.data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

///get employee by id
export const Adm_GetEmployeeById = createAsyncThunk(
  "api/Employee/Adm_getEmployeeById",
  async (values, thunkApi) => {
    try {
      const response = await employeeApi.Adm_GetEmployeeById(values);
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
      return thunkApi.rejectWithValue({ error: error.message });
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
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const employeeSlice = createSlice({
  name: "Employee",
  initialState: {
    dataEmpList: null,
    dataEmp: JSON.stringify(localStorage.getItem("accessTokenEmp")) || {},
    loading: false,
    error: "",
  },

  // start Login
  extraReducers: (builder) => {
    builder.addCase(LoginEmp.pending, (state) => {
      state.dataEmp = {};
      state.loading = false;
    });

    builder.addCase(LoginEmp.fulfilled, (state, { payload }) => {
      state.dataEmp = payload;
      state.loading = true;
    });

    builder.addCase(LoginEmp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.error;
    });

    //end

    //get employee list
    builder.addCase(Adm_GetEmployeeList.pending, (state) => {
      state.dataEmpList = null;
      state.loading = false;
    });
    builder.addCase(Adm_GetEmployeeList.fulfilled, (state, { payload }) => {
      state.dataEmpList = payload;
      state.loading = true;
    });
    builder.addCase(Adm_GetEmployeeList.rejected, (state, action) => {
      state.dataEmpList = [];
      state.loading = false;
      state.error = action.error.error;
    });

    ///get employee by id
    builder.addCase(Adm_GetEmployeeById.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(Adm_GetEmployeeById.fulfilled, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(Adm_GetEmployeeById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.error;
    });

    ///create employee
    builder.addCase(Adm_CreateEmployee.pending, (state) => {
      //state.dataEmpList = null;
      state.loading = false;
    });
    builder.addCase(Adm_CreateEmployee.fulfilled, (state, { payload }) => {
      //state.dataEmpList = payload;
      // tạo mới thì payload trả về là một obj vừa tạo
      // e set state.dataEmpList = payload =>> v là dỡ rồi, anh nói rồi mà he
      // khúc này khi thêm dữ liệu, mình cần trả về một nhân viên, nếu cần thưc hiện gì liên qua tới nhân viên thì lấy ID mà ayload trả về
      // không thì thôi
      // ví dụ thêm một tour => payload trả về Tour, tôi cần thêm tour trước, xong rồi mới thêm chi tiết,
      // thì payload trả về pbjTOur, mình lây ID => thực hiện việc tiếp theo

      state.loading = true;
    });
    builder.addCase(Adm_CreateEmployee.rejected, (state, action) => {
      // rớt ra lỗi, em set luôn listData = [] thif table khong co du lieu, maf trong khi table minh chua tac dong toi
      state.loading = false;
      state.error = action.error.error;
    });

    ///delete employee
    builder.addCase(Adm_DeleteEmployee.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(Adm_DeleteEmployee.fulfilled, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(Adm_DeleteEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.error;
    });
  },
});

const { reducer: employeeReducer } = employeeSlice;
export default employeeReducer;
