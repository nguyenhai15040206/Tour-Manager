import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addressApi } from "./../../../apis/AddressApi";

// Nguyễn Tấn Hải - 20211115

export const Adm_GetProvince = createAsyncThunk(
  "api/Province/Adm_GetProvince",
  async (values, thunkApi) => {
    try {
      const response = await addressApi.Adm_GetProvince(values);
      return response;
    } catch (error) {
      //console.log(thunkApi.rejectWithValue({ error: error.message }));
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const Adm_GetProvinceAndSearch = createAsyncThunk(
  "api/Province/Adm_GetProvinceAndSearch",
  async (values, thunkApi) => {
    try {
      const response = await addressApi.Adm_GetProvinceAndSearch(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const addressSlice = createSlice({
  name: "Address",
  initialState: {
    data: null,
    dataSearch: [],
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(Adm_GetProvince.pending, (state) => {
      state.data = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetProvince.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetProvince.rejected, (state, action) => {
      state.loading = "error";
      state.data = [];
      state.error = action.payload.error;
    });

    ///
    builder.addCase(Adm_GetProvinceAndSearch.pending, (state) => {
      state.dataSearch = [];
      state.loading = "loading";
    });
    builder.addCase(
      Adm_GetProvinceAndSearch.fulfilled,
      (state, { payload }) => {
        state.dataSearch = payload;
        state.loading = "loaded";
      }
    );
    builder.addCase(Adm_GetProvinceAndSearch.rejected, (state, action) => {
      state.dataSearch = null;
      state.loading = "error";
      state.error = action.error.message;
    });
  },
});

const { reducer: addressReducer } = addressSlice;
export default addressReducer;
