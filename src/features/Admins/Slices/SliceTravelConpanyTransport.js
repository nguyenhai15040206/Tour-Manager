import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import travelConpanyTransportApi from "../../../apis/TravelConpanyTransportApi";

// Nguyễn Tấn Hải [23/10/2021] // Get dữ liệu từ enum

///get
export const Adm_GetCompanyList = createAsyncThunk(
  "api/TravelConpanyTransport/Adm_GetCompanyList",
  async (values, thunkApi) => {
    try {
      const response = await travelConpanyTransportApi.Adm_GetCompanyList(
        values
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);

///get
export const Adm_InsertCompany = createAsyncThunk(
  "api/TravelConpanyTransport/Adm_InsertCompany",
  async (values, thunkApi) => {
    try {
      const response = await travelConpanyTransportApi.Adm_InsertCompany(
        values
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);
///get
export const Adm_UpdateCompany = createAsyncThunk(
  "api/TravelConpanyTransport/Adm_UpdateCompany",
  async (values, thunkApi) => {
    try {
      const response = await travelConpanyTransportApi.Adm_UpdateCompany(
        values
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);
///get
export const Adm_GetCompanyById = createAsyncThunk(
  "api/TravelConpanyTransport/Adm_GetCompanyById",
  async (values, thunkApi) => {
    try {
      const response = await travelConpanyTransportApi.Adm_GetCompanyById(
        values
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);
///get
export const Adm_GetCompanyByTravelTypeCbo = createAsyncThunk(
  "api/TravelConpanyTransport/Adm_GetCompanyByTravelTypeCbo",
  async (values, thunkApi) => {
    try {
      const response =
        await travelConpanyTransportApi.Adm_GetCompanyByTravelTypeCbo(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);
///get
export const Adm_GetCompanyTransportInTourCbo = createAsyncThunk(
  "api/TravelConpanyTransport/Adm_GetCompanyTransportInTourCbo",
  async (values, thunkApi) => {
    try {
      const response =
        await travelConpanyTransportApi.Adm_GetCompanyTransportInTourCbo(
          values
        );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);

//delete
export const Adm_DeleteCompanyByIds = createAsyncThunk(
  "api/TravelConpanyTransport/Adm_DeleteCompanyByIds",
  async (values, thunkApi) => {
    try {
      const response = await travelConpanyTransportApi.Adm_DeleteCompanyByIds(
        values
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
      });
    }
  }
);

const travelConpanyTransportSlice = createSlice({
  name: "TravelConpanyTransport",
  initialState: {
    data: null,
    companyByID: {},
    companyByTravelType: [],
    companyTravelInTour: [],
    dataInsert: {},
    loading: "idle",
    error: "",
  },

  // start Login
  extraReducers: (builder) => {
    // get
    builder.addCase(Adm_GetCompanyTransportInTourCbo.pending, (state) => {
      state.companyTravelInTour = [];
      state.loading = "loading";
    });

    builder.addCase(
      Adm_GetCompanyTransportInTourCbo.fulfilled,
      (state, { payload }) => {
        state.companyTravelInTour = payload;
        state.loading = "loaded";
      }
    );

    builder.addCase(
      Adm_GetCompanyTransportInTourCbo.rejected,
      (state, action) => {
        state.companyTravelInTour = [];
        state.loading = "error";
        state.error = action.error.error;
      }
    );
    //end
    // get
    builder.addCase(Adm_GetCompanyList.pending, (state) => {
      state.data = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetCompanyList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetCompanyList.rejected, (state, action) => {
      state.data = [];
      state.loading = "error";
      state.error = action.error.error;
    });
    //end

    // post
    builder.addCase(Adm_InsertCompany.pending, (state) => {
      state.dataInsert = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_InsertCompany.fulfilled, (state, { payload }) => {
      state.dataInsert = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_InsertCompany.rejected, (state, action) => {
      state.dataInsert = {};
      state.loading = "error";
      state.error = action.error.error;
    });
    //end
    // put
    builder.addCase(Adm_UpdateCompany.pending, (state) => {
      state.dataInsert = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_UpdateCompany.fulfilled, (state, { payload }) => {
      state.dataInsert = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_UpdateCompany.rejected, (state, action) => {
      state.dataInsert = {};
      state.loading = "error";
      state.error = action.error.error;
    });
    //end

    // post
    builder.addCase(Adm_GetCompanyById.pending, (state) => {
      state.companyByID = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetCompanyById.fulfilled, (state, { payload }) => {
      state.companyByID = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetCompanyById.rejected, (state, action) => {
      state.companyByID = {};
      state.loading = "error";
      state.error = action.error.error;
    });
    //end
    // get company by traveltype
    builder.addCase(Adm_GetCompanyByTravelTypeCbo.pending, (state) => {
      state.companyByTravelType = [];
      state.loading = "loading";
    });

    builder.addCase(
      Adm_GetCompanyByTravelTypeCbo.fulfilled,
      (state, { payload }) => {
        state.companyByTravelType = payload;
        state.loading = "loaded";
      }
    );

    builder.addCase(Adm_GetCompanyByTravelTypeCbo.rejected, (state, action) => {
      state.companyByTravelType = [];
      state.loading = "error";
      state.error = action.error.error;
    });
    //end

    // Xóa
    builder.addCase(Adm_DeleteCompanyByIds.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_DeleteCompanyByIds.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_DeleteCompanyByIds.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload.error;
    });
  },
});

const { reducer: travelConpanyTransportSliceReducer } =
  travelConpanyTransportSlice;
export default travelConpanyTransportSliceReducer;
