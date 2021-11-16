import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import addressApi from "../../../apis/AddressApi";

// Nguyễn Tấn Hải - 20211115

export const Adm_GetProvince = createAsyncThunk(
  "api/Province/Adm_GetProvince",
  async (values, thunkApi) => {
    try {
      const response = await addressApi.Adm_GetProvince(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const addressSlice = createSlice({
  name: "TouristAttraction",
  initialState: {
    data: [],
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(Adm_GetProvince.pending, (state) => {
      state.data = [];
      state.loading = "loading";
    });

    builder.addCase(Adm_GetProvince.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetProvince.rejected, (state, action) => {
      state.loading = "error";
      state.data = [];
      state.error = action.error.message;
    });
  },
});

const { reducer: addressReducer } = addressSlice;
export default addressReducer;
