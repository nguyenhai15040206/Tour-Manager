import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import newsApi from "../../../apis/NewsApi";

// Nguyễn Tấn Hải - 20211115

export const Adm_GetDataNewsList = createAsyncThunk(
  "api/News/Adm_GetDataNewsList",
  async (values, thunkApi) => {
    try {
      const response = await newsApi.Adm_GetDataNewsList(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
      });
    }
  }
);
export const Adm_InsertNews = createAsyncThunk(
  "api/News/Adm_InsertNews",
  async (values, thunkApi) => {
    try {
      const response = await newsApi.Adm_InsertNews(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
      });
    }
  }
);

export const Adm_GetNewsDetails = createAsyncThunk(
  "api/News/Adm_GetNewsDetails",
  async (values, thunkApi) => {
    try {
      const response = await newsApi.Adm_GetNewsDetails(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
      });
    }
  }
);
export const Adm_UpdateNews = createAsyncThunk(
  "api/News/Adm_UpdateNews",
  async (values, thunkApi) => {
    try {
      const response = await newsApi.Adm_UpdateNews(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
      });
    }
  }
);
export const Adm_DeleteNews = createAsyncThunk(
  "api/News/Adm_DeleteNews",
  async (values, thunkApi) => {
    try {
      const response = await newsApi.Adm_DeleteNews(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
      });
    }
  }
);

//================== Client
// lấy cho cẩm nang
export const Cli_GetDataNews = createAsyncThunk(
  "api/News/Cli_GetDataNews",
  async (values, thunkApi) => {
    try {
      const response = await newsApi.Cli_GetDataNews(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
      });
    }
  }
);

//
export const Cli_GetDataNewsDetails = createAsyncThunk(
  "api/News/Cli_GetDataNewsDetails",
  async (values, thunkApi) => {
    try {
      const response = await newsApi.Cli_GetDataNewsDetails(values);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
      });
    }
  }
);

//================

const newsSlice = createSlice({
  name: "News",
  initialState: {
    data: null,
    dataDetails: {},
    dataCliDetails: {},
    loading: "idle",
    error: "",
    dataClient: [],
  },

  extraReducers: (builder) => {
    //============== Client
    builder.addCase(Cli_GetDataNewsDetails.pending, (state) => {
      state.dataCliDetails = {};
      state.loading = "loading";
    });

    builder.addCase(Cli_GetDataNewsDetails.fulfilled, (state, { payload }) => {
      state.dataCliDetails = payload;
      state.loading = "loaded";
    });

    builder.addCase(Cli_GetDataNewsDetails.rejected, (state, action) => {
      state.loading = "error";
    });
    //
    builder.addCase(Cli_GetDataNews.pending, (state) => {
      state.dataCliDetails = {};
      state.loading = "loading";
    });

    builder.addCase(Cli_GetDataNews.fulfilled, (state, { payload }) => {
      state.dataClient = payload?.data;
      state.loading = "loaded";
    });

    builder.addCase(Cli_GetDataNews.rejected, (state, action) => {
      state.loading = "error";
    });
    //

    //========================================
    // Admin
    builder.addCase(Adm_DeleteNews.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_DeleteNews.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_DeleteNews.rejected, (state, action) => {
      state.loading = "error";
    });
    //
    builder.addCase(Adm_UpdateNews.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_UpdateNews.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_UpdateNews.rejected, (state, action) => {
      state.loading = "error";
    });

    //
    builder.addCase(Adm_GetNewsDetails.pending, (state) => {
      state.dataDetails = {};
      state.loading = "loading";
    });

    builder.addCase(Adm_GetNewsDetails.fulfilled, (state, { payload }) => {
      state.dataDetails = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetNewsDetails.rejected, (state, action) => {
      state.loading = "error";
      state.dataDetails = {};
    });
    //
    builder.addCase(Adm_InsertNews.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(Adm_InsertNews.fulfilled, (state, { payload }) => {
      state.loading = "loaded";
    });

    builder.addCase(Adm_InsertNews.rejected, (state, action) => {
      state.loading = "error";
    });

    //
    builder.addCase(Adm_GetDataNewsList.pending, (state) => {
      state.data = null;
      state.loading = "loading";
    });

    builder.addCase(Adm_GetDataNewsList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = "loaded";
    });

    builder.addCase(Adm_GetDataNewsList.rejected, (state, action) => {
      state.loading = "error";
      state.data = [];
    });
  },
});

const { reducer: newsReducer } = newsSlice;
export default newsReducer;
