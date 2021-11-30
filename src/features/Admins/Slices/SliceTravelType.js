import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import travelTypeApi from "../../../apis/TravelTypeApi";

// Nguyễn Tấn Hải - 20211114

export const Adm_GetTravelTypeCbo = createAsyncThunk(
  "api/TravelType/Adm_GetTravelTypeCbo",
  async (values, thunkApi) => {
    try {
      const response = await travelTypeApi.Adm_GetTravelTypeCbo();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const travelTypeSlice = createSlice({
  name: "TravelType",
  initialState: {
    dataCbo: null,
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    // Start Get all tour Attraction
    builder.addCase(Adm_GetTravelTypeCbo.pending, (state) => {
      state.dataCbo = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetTravelTypeCbo.fulfilled, (state, { payload }) => {
      state.dataCbo = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetTravelTypeCbo.rejected, (state, action) => {
      state.loading = "error";
      state.dataCbo = [];
      state.error = action.error.message;
    });
    //end
  },
});

const { reducer: travelTypeReducer } = travelTypeSlice;
export default travelTypeReducer;
