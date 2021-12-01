import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { districtApi } from "./../../../apis/AddressApi";

export const Adm_GetDisTrictByIdPro = createAsyncThunk(
  "api/District/Adm_GetDisTrictByIdPro",
  async (params, thunkApi) => {
    try {
      const response = await districtApi.Adm_GetDisTrictByIdPro(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const Adm_GetDistrictByProvinceCBB = createAsyncThunk(
  "api/District/Adm_GetDistrictByProvinceCBB",
  async (params, thunkApi) => {
    try {
      const response = await districtApi.Adm_GetDistrictByProvinceCBB(params);
      return response;
    } catch (error) {
      return thunkApi.fulfillWithValue(error.response.data);
    }
  }
);

const districtSlice = createSlice({
  name: "District",
  initialState: {
    dataDistrictCbb: [],
    dataDistrict: [],
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    //search
    builder.addCase(Adm_GetDisTrictByIdPro.pending, (state) => {
      state.dataDistrict = null;
      state.loading = "loading";
    });
    builder.addCase(Adm_GetDisTrictByIdPro.fulfilled, (state, { payload }) => {
      state.dataDistrict = payload;
      state.loading = "loaded";
    });
    builder.addCase(Adm_GetDisTrictByIdPro.rejected, (state, action) => {
      state.dataDistrict = [];
      state.loading = "error";
      state.error = action.error.error;
    });

    ///get by province cbb
    builder.addCase(Adm_GetDistrictByProvinceCBB.pending, (state) => {
      state.dataDistrictCbb = null;
      state.loading = "loading";
    });
    builder.addCase(
      Adm_GetDistrictByProvinceCBB.fulfilled,
      (state, { payload }) => {
        state.dataDistrictCbb = payload;
        state.loading = "loaded";
      }
    );
    builder.addCase(Adm_GetDistrictByProvinceCBB.rejected, (state, action) => {
      state.dataDistrictCbb = [];
      state.loading = "error";
      state.error = action.error.message;
    });
  },
});
const { reducer: districtReducer } = districtSlice;
export default districtReducer;
