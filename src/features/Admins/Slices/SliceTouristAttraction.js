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
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

///theem
export const Adm_CreateTourAttr = createAsyncThunk(
  "api/TouristAttraction/Admin_CreateTourAttraction",
  async (values, thunkApi) => {
    try {
      await touristAttractionApi.Adm_CreateTouristAttr(values);
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

///xóa một địa điểm du lịch
export const Adm_DeleteTouristAttr = createAsyncThunk(
  "api/TouristAttraction/Adm_DeleteTouristAttr",
  async (values, thunkApi) => {
    try {
      await touristAttractionApi.Adm_DeleteTouristAttrList(values);
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

//get information touristAttr
export const Adm_GetTouristAttrById = createAsyncThunk(
  "api/TouristAttraction/Adm_GetTouristAttrById",
  async (params, thunkApi) => {
    try {
      const response = await touristAttractionApi.Adm_GetTouristAttById(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
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
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);
export const Adm_GetTouristAttByProvince = createAsyncThunk(
  "api/TouristAttraction/Adm_GetTouristAttByProvince",
  async (params, thunkApi) => {
    try {
      const response = await touristAttractionApi.Adm_GetTouristAttByProvince(
        params
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

export const Adm_EditTouristAttr = createAsyncThunk(
  "api/TouristAttr/Adm_EditTouristAttr",
  async (values, thunkApi) => {
    try {
      const response = await touristAttractionApi.Adm_EditTouristAttr(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

const touristAttrSlice = createSlice({
  name: "TouristAttraction",
  initialState: {
    touristAttID: null,
    touristAttrByRegions: [],
    data: null,
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    // Start Get all tour Attraction
    builder.addCase(Adm_GetTouristAttr.pending, (state) => {
      state.data = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetTouristAttr.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetTouristAttr.rejected, (state, action) => {
      state.loading = "error";
      state.data = [];
      state.error = action.error.error;
    });
    //end
    // Start Get  tour Attraction by Provinces
    builder.addCase(Adm_GetTouristAttByProvince.pending, (state) => {
      state.touristAttrByRegions = [];
      state.loading = "loading";
    });

    builder.addCase(
      Adm_GetTouristAttByProvince.fulfilled,
      (state, { payload }) => {
        state.touristAttrByRegions = payload;
        state.loading = "loaded";
      }
    );

    builder.addCase(Adm_GetTouristAttByProvince.rejected, (state, action) => {
      state.loading = "error";
      state.touristAttrByRegions = [];
      state.error = action.error.message;
    });
    //end
    // Start Get  tour Attraction by regions
    builder.addCase(Adm_GetTouristAttByRegions.pending, (state) => {
      state.touristAttrByRegions = [];
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

    ///them
    builder.addCase(Adm_CreateTourAttr.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_CreateTourAttr.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });
    builder.addCase(Adm_CreateTourAttr.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });

    ///xóa
    builder.addCase(Adm_DeleteTouristAttr.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_DeleteTouristAttr.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });
    builder.addCase(Adm_DeleteTouristAttr.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });

    //get by id
    builder.addCase(Adm_GetTouristAttrById.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_GetTouristAttrById.fulfilled, (state, { payload }) => {
      state.touristAttID = payload;
      state.loading = "loaded";
    });
    builder.addCase(Adm_GetTouristAttrById.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });

    //edit
    builder.addCase(Adm_EditTouristAttr.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(Adm_EditTouristAttr.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });
    builder.addCase(Adm_EditTouristAttr.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.error;
    });
  },
});

const { reducer: touristAttrReducer } = touristAttrSlice;
export default touristAttrReducer;
