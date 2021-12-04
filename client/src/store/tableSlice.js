/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../common/axios";

const name = "table";

const initialState = {
  isAddClick: false,
  tables: [],
};

export const tableSlice = createSlice({
  name,
  initialState,
  reducers: {
    getTables: (state, action) => {
      state.tables = [...action.payload];
    },
    add: (state, action) => {
      state.isAddClick = action.payload; // 상태 변경 예시 1
    },
  },
  extraReducers: {},
});

export const { getTables, add } = tableSlice.actions;
