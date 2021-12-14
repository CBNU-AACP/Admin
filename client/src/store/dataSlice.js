/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../common/axios";

const name = "data";

export const getData = createAsyncThunk(
  `${name}/getData`,
  async (tablename, thunkAPI) => {
    try {
      console.log(tablename);
      const response = await axios.get(`/v1/row/${tablename}`);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

const initialState = {
  currentDataList: [],
};

export const dataSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getData.fulfilled.type]: (state, action) => {
      // 성공
      state.currentDataList = action.payload;
    },
    [getData.rejected.type]: (state, action) => {
      // 실패
      state.currentDataList = [];
    },
  },
});

// export const {} = dataSlice.actions;
