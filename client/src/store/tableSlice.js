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
      const response = await axios.post("/v1/table", data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const removeTable = createAsyncThunk(
  `${name}/removeTable`,
  async (tableName, thunkAPI) => {
    try {
      const response = await axios.delete(`/v1/table/${tableName}`);
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
  isLoading: false,
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
    [getTables.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getTables.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.tables = [...action.payload];
      state.currentTable = "createTable";
      state.currentSchemaData = [];
    },
    [getTables.rejected.type]: (state, action) => {
      state.tables = action.payload;
      state.currentTable = "createTable";
      state.currentSchemaData = [];
    },

    [addTable.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [addTable.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.tables = [...state.tables, action.payload.data.name];
    },
    [addTable.rejected.type]: (state, action) => {
      state.isLoading = false;
    },

    [removeTable.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [removeTable.fulfilled.type]: (state, action) => {
      state.tables = [
        ...state.tables.filter(table => table !== action.payload.data.name),
      ];
      state.currentTable = "createTable";
      state.isLoading = false;
    },
    [removeTable.rejected.type]: (state, action) => {
      state.isLoading = false;
    },

    [getSchema.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getSchema.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.currentSchemaData = {
        original: action.payload,
        attributes: dataToSchema(action.payload),
        schemaKey: dataToKey(action.payload),
      };
    },
    [getSchema.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.currentSchemaData = {};
    },
  },
});

export const { setTable, setCurrentSchemaData } = tableSlice.actions;
