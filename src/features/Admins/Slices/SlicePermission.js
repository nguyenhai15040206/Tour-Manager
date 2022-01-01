import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import permisstionApi from "../../../apis/PermissionApi";

// Nguyễn Tấn Hải - 20211115

export const Adm_InsertUserGroup = createAsyncThunk(
  "api/Permisstion/Adm_InsertUserGroup",
  async (values, thunkApi) => {
    try {
      const response = await permisstionApi.Adm_InsertUserGroup(values);
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
export const Adm_GetDatatUserGroup = createAsyncThunk(
  "api/Permisstion/Adm_GetDatatUserGroup",
  async (values, thunkApi) => {
    try {
      const response = await permisstionApi.Adm_GetDatatUserGroup(values);
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
export const Adm_GetPermistion = createAsyncThunk(
  "api/Permisstion/Adm_GetPermistion",
  async (values, thunkApi) => {
    try {
      const response = await permisstionApi.Adm_GetPermistion(values);
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
export const Adm_DeleteUserGroup = createAsyncThunk(
  "api/Permisstion/Adm_DeleteUserGroup",
  async (values, thunkApi) => {
    try {
      const response = await permisstionApi.Adm_DeleteUserGroup(values);
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

//========= danh sách người dùng chưa có nhóm
export const Adm_GetDataEmpNoGroup = createAsyncThunk(
  "api/Permisstion/Adm_GetDataEmpNoGroup",
  async (values, thunkApi) => {
    try {
      const response = await permisstionApi.Adm_GetDataEmpNoGroup(values);
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
export const Adm_GetDataEmpByGroupID = createAsyncThunk(
  "api/Permisstion/Adm_GetDataEmpByGroupID",
  async (values, thunkApi) => {
    try {
      const response = await permisstionApi.Adm_GetDataEmpByGroupID(values);
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

// thêm - xóa người dùng ra khỏ nhóm
export const Adm_InsertEmpInGroup = createAsyncThunk(
  "api/Permisstion/Adm_InsertEmpInGroup",
  async (values, thunkApi) => {
    try {
      const response = await permisstionApi.Adm_InsertEmpInGroup(values);
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
export const Adm_DeleteEmpInGroup = createAsyncThunk(
  "api/Permisstion/Adm_DeleteEmpInGroup",
  async (values, thunkApi) => {
    try {
      const response = await permisstionApi.Adm_DeleteEmpInGroup(values);
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

const permissionSlice = createSlice({
  name: "Address",
  initialState: {
    dataUserGroup: null,
    dataPermission: null,
    dataEmpNoGroup: null,
    dataEmpByGroupID: null,
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(Adm_DeleteEmpInGroup.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_DeleteEmpInGroup.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_DeleteEmpInGroup.rejected, (state, action) => {
      state.loading = "error";
    });

    //////
    builder.addCase(Adm_InsertEmpInGroup.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_InsertEmpInGroup.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_InsertEmpInGroup.rejected, (state, action) => {
      state.loading = "error";
    });

    //////
    builder.addCase(Adm_GetDataEmpByGroupID.pending, (state) => {
      state.dataEmpByGroupID = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetDataEmpByGroupID.fulfilled, (state, { payload }) => {
      state.dataEmpByGroupID = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetDataEmpByGroupID.rejected, (state, action) => {
      state.loading = "error";
      state.dataEmpByGroupID = [];
    });

    //
    builder.addCase(Adm_GetDataEmpNoGroup.pending, (state) => {
      state.dataEmpNoGroup = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetDataEmpNoGroup.fulfilled, (state, { payload }) => {
      state.dataEmpNoGroup = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetDataEmpNoGroup.rejected, (state, action) => {
      state.loading = "error";
      state.dataEmpNoGroup = [];
    });

    //============
    builder.addCase(Adm_DeleteUserGroup.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_DeleteUserGroup.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_DeleteUserGroup.rejected, (state, action) => {
      state.loading = "error";
    });

    //============
    builder.addCase(Adm_GetPermistion.pending, (state) => {
      state.dataPermission = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetPermistion.fulfilled, (state, { payload }) => {
      state.dataPermission = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetPermistion.rejected, (state, action) => {
      state.loading = "error";
      state.dataPermission = [];
    });

    //============
    builder.addCase(Adm_GetDatatUserGroup.pending, (state) => {
      state.dataUserGroup = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetDatatUserGroup.fulfilled, (state, { payload }) => {
      state.dataUserGroup = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetDatatUserGroup.rejected, (state, action) => {
      state.loading = "error";
      state.dataUserGroup = [];
    });

    //============
    builder.addCase(Adm_InsertUserGroup.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_InsertUserGroup.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_InsertUserGroup.rejected, (state, action) => {
      state.loading = "error";
    });
  },
});

const { reducer: permissionReducer } = permissionSlice;
export default permissionReducer;
