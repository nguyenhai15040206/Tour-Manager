import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import touristAttractionApi from "../../../apis/TouristAttraction";

// Nguyễn Tấn Hải - 20211114

export const Adm_GetTouristAttr = createAsyncThunk(
  "api/TouristAttraction/GetTouristAttrList",
  async (values, thunkApi) => {
    try {
      const response = await touristAttractionApi.Adm__GetTouristAttrList(
        values
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);
export const Adm_GetTouristAttByRegions = createAsyncThunk(
  "api/TouristAttraction/Adm_GetTouristAttByRegions",
  async (params, thunkApi) => {
    try {
      const response = await touristAttractionApi.Adm_GetTouristAttByRegions(
        params
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const touristAttrSlice = createSlice({
  name: "TouristAttraction",
  initialState: {
    touristAttrByRegions: [],
    data: [],
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    // Start Get all tour Attraction
    builder.addCase(Adm_GetTouristAttr.pending, (state) => {
      state.data = [];
      state.loading = "loading";
    });

    builder.addCase(Adm_GetTouristAttr.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetTouristAttr.rejected, (state, action) => {
      state.loading = "error";
      state.data = [];
      state.error = action.error.message;
    });
    //end
    // Start Get  tour Attraction by regions
    builder.addCase(Adm_GetTouristAttByRegions.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(
      Adm_GetTouristAttByRegions.fulfilled,
      (state, { payload }) => {
        state.touristAttrByRegions = payload;
        state.loading = "loaded";
      }
    );

    builder.addCase(Adm_GetTouristAttByRegions.rejected, (state, action) => {
      state.loading = "error";
      state.touristAttrByRegions = [];
      state.error = action.error.message;
    });
    //end
  },
});

const { reducer: touristAttrReducer } = touristAttrSlice;
export default touristAttrReducer;
