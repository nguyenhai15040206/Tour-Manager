import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wardsApi } from "../../../apis/AddressApi";

export const Adm_GetWardsByIdPro = createAsyncThunk(
  "api/Wards/Adm_GetDisTrictByIdPro",
  async (values, thunkApi) => {
    try {
      const response = await wardsApi.Adm_GetWardsByIdPro(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const Adm_GetWardsByIdDistrictCbb = createAsyncThunk(
  "api/Wards/Adm_GetWardsByIdDistrictCbb",
  async (values, thunkApi) => {
    try {
      const response = await wardsApi.Adm_GetDataWardsByDistrictCbb(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const wardsSlice = createSlice({
  name: "Wards",
  initialState: {
    dataWards: null,
    dataWardsCbb: [],
    loading: "idle",
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(Adm_GetWardsByIdPro.pending, (state) => {
      state.dataWards = null;
      state.loading = "loading";
    });
    builder.addCase(Adm_GetWardsByIdPro.fulfilled, (state, { payload }) => {
      state.dataWards = payload;
      state.loading = "loaded";
    });
    builder.addCase(Adm_GetWardsByIdPro.rejected, (state, action) => {
      state.dataWards = [];
      state.loading = "error";
      state.error = action.error.message;
    });

    /////
    builder.addCase(Adm_GetWardsByIdDistrictCbb.pending, (state) => {
      state.dataWardsCbb = null;
      state.loading = "loading";
    });
    builder.addCase(
      Adm_GetWardsByIdDistrictCbb.fulfilled,
      (state, { payload }) => {
        state.dataWardsCbb = payload;
        state.loading = "loaded";
      }
    );
    builder.addCase(Adm_GetWardsByIdDistrictCbb.rejected, (state, action) => {
      state.dataWardsCbb = [];
      state.loading = "error";
      state.error = action.error.message;
    });
  },
});

const { reducer: wardsReducer } = wardsSlice;
export default wardsReducer;
