/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../common/axios";

const name = "database";

export const getDataBases = createAsyncThunk(
  `${name}/getDataBases`,
  async thunkAPI => {
    try {
      const response = await axios.get("/v1/database");
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const createDataBases = createAsyncThunk(
  `${name}/createDataBases`,
  async (name, thunkAPI) => {
    try {
      const response = await axios.post(`/v1/database/${name}`);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const removeDataBases = createAsyncThunk(
  `${name}/removeDataBases`,
  async (name, thunkAPI) => {
    try {
      const response = await axios.delete(`/v1/database/${name}`);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

const initialState = {
  databases: [],
};

export const dbSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getDataBases.fulfilled.type]: (state, action) => {
      // 성공
      state.databases = action.payload;
    },
    [getDataBases.rejected.type]: (state, action) => {
      // 실패
      state.databases = action.payload;
    },
    [createDataBases.fulfilled.type]: (state, action) => {
      // 성공
      state.databases = action.payload;
    },
    [createDataBases.rejected.type]: (state, action) => {
      // 실패
      state.databases = action.payload;
    },
    [removeDataBases.fulfilled.type]: (state, action) => {
      // 성공
      state.databases = action.payload;
    },
    [removeDataBases.rejected.type]: (state, action) => {
      // 실패
      state.databases = action.payload;
    },
  },
});

// export const {} = dbSlice.actions;
