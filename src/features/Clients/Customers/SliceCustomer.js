import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerApi from "../../../apis/CustomerApi";

// Nguyễn Tấn Hải [23/10/2021] // Xử lý Login
export const GetToken = createAsyncThunk(
  "api/KhachHang",
  async (values, thunkApi) => {
    try {
      const response = await customerApi.PostToken(values);
      localStorage.setItem("accessToken", response.accessToken);
      console.log(response.data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);



const customerSlice = createSlice({
  name: "Customer",
  initialState: {
    dataCustomer: {},
    loading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
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
