/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../common/axios";

const name = "table";

const initialState = {
  tables: [],
  currentTable: "createTable",
  currentSchema: [],
  currentSchemaData: [],
};

export const tableSlice = createSlice({
  name,
  initialState,
  reducers: {
    getTables: (state, action) => {
      // thunk 로 대체
      state.tables = [...action.payload];
      state.currentTable = "createTable";
      state.currentSchema = [];
      state.currentSchemaData = [];
    },
    setTable: (state, action) => {
      state.currentTable = action.payload;
    },
    getCurrentSchemaData: (state, action) => {
      // thunk 로 대체
      state.currentSchemaData = action.payload;
    },
    setCurrentSchema: (state, action) => {
      state.currentSchema = action.payload;
    },
  },
  extraReducers: {},
});

export const { getTables, setTable, getCurrentSchemaData, setCurrentSchema } =
  tableSlice.actions;
