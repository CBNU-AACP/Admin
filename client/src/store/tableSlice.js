/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dataToKey, dataToSchema } from "../utils";
import axios from "../common/axios";

const name = "table";

export const getTables = createAsyncThunk(
  `${name}/getTables`,
  async thunkAPI => {
    try {
      const response = await axios.get("/v1/table");
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const addTable = createAsyncThunk(
  `${name}/addTable`,
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const response = await axios.post("/v1/table", data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const getSchema = createAsyncThunk(
  `${name}/getSchema`,
  async (tablename, thunkAPI) => {
    try {
      const response = await axios.get(`/v1/table/single/${tablename}`);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

const initialState = {
  tables: [],
  currentTable: "createTable",
  currentSchemaData: {},
  currentDataList: [],
};

export const tableSlice = createSlice({
  name,
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.currentTable = action.payload;
    },
  },
  extraReducers: {
    [getTables.fulfilled.type]: (state, action) => {
      // 성공
      state.tables = [...action.payload];
      state.currentTable = "createTable";
      state.currentSchemaData = [];
    },
    [getTables.rejected.type]: (state, action) => {
      // 실패
      state.tables = action.payload;
      state.currentTable = "createTable";
      state.currentSchemaData = [];
    },

    [addTable.fulfilled.type]: (state, action) => {
      // 성공
      // state.tables = [...action.payload];
      // state.currentTable = "createTable";
      // state.currentSchemaData = [];
      console.log("success");
    },
    [addTable.rejected.type]: (state, action) => {
      console.log(action.payload);
      // 실패
      // state.tables = action.payload;
      // state.currentTable = "createTable";
      // state.currentSchemaData = [];
    },

    [getSchema.fulfilled.type]: (state, action) => {
      // 성공
      state.currentSchemaData = {
        original: action.payload,
        attributes: dataToSchema(action.payload),
        schemaKey: dataToKey(action.payload),
      };
    },
    [getSchema.rejected.type]: (state, action) => {
      // 실패
      state.currentSchemaData = {};
    },
  },
});

export const { setTable, setCurrentSchemaData } = tableSlice.actions;
