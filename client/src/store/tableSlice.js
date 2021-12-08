/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../common/axios";

const name = "table";

const initialState = {
  tables: [],
  currentTable: "createTable",
};

export const tableSlice = createSlice({
  name,
  initialState,
  reducers: {
    getTables: (state, action) => {
      state.tables = [...action.payload];
    },
    setTable: (state, action) => {
      state.currentTable = action.payload;
    },
  },
  extraReducers: {},
});

export const { getTables, setTable } = tableSlice.actions;
