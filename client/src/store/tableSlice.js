/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../common/axios";

const name = "table";

const initialState = {
  tables: [],
  currentTable: "createTable",
  currentSchemaData: {},
};

export const tableSlice = createSlice({
  name,
  initialState,
  reducers: {
    getTables: (state, action) => {
      // thunk 로 대체
      state.tables = [...action.payload];
      state.currentTable = "createTable";
      state.currentSchemaData = [];
    },
    setTable: (state, action) => {
      state.currentTable = action.payload;
    },
    setCurrentSchemaData: (state, action) => {
      // thunk 로 대체
      state.currentSchemaData = action.payload;
    },
  },
  extraReducers: {},
});

export const { getTables, setTable, setCurrentSchemaData } = tableSlice.actions;
