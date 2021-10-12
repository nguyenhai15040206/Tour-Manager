import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerApi from "../../../apis/CustomerApi";

export const GetToken = createAsyncThunk("api/KhachHang", async (values) => {
  try {
    const response = await customerApi.PostToken(values);
    localStorage.setItem("accessToken", response);
    alert("Thành công!");
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const LoginUser = createAsyncThunk("Login/User", async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await customerApi.GetUserLogin(token);
    return response;
  } catch (error) {
    console.log(error);
  }
});

const customerSlice = createSlice({
  name: "Customer",
  initialState: {
    infoUser: {},
    token: "",
    status: null,
  },
  reducers: {},
  extraReducers: {
    [GetToken.pending]: (state) => {
      state.status = "loading";
    },
    [GetToken.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.status = "success";
    },
    [GetToken.rejected]: (state) => {
      state.status = "failed";
    },

    [LoginUser.pending]: (state) => {
      state.status = "loading";
    },
    [LoginUser.rejected]: (state) => {
      state.status = "failed";
    },
    [LoginUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.infoUser = action.payload;
    },
  },
});

const { reducer: customerReducer, actions } = customerSlice;
export const { addCustomer } = actions;
export default customerReducer;
