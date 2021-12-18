/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../common/axios";

const name = "data";

export const getData = createAsyncThunk(
  `${name}/getData`,
  async (tablename, thunkAPI) => {
    try {
      const response = await axios.get(`/v1/row/${tablename}`);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const addData = createAsyncThunk(
  `${name}/addData`,
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const response = await axios.post(`/v1/row`, data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const removeData = createAsyncThunk(
  `${name}/removeData`,
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const response = await axios.post(`/v1/row/delete`, data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  isLoading: false,
  error: "",
  currentDataList: [],
};

export const dataSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getData.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getData.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "";
      state.currentDataList = action.payload;
    },
    [getData.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
      state.currentDataList = [];
    },

    [addData.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [addData.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "";
    },
    [addData.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
      state.currentDataList = [];
    },

    [removeData.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [removeData.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "";
    },
    [removeData.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
      state.currentDataList = [];
    },
  },
});

// export const {} = dataSlice.actions;
