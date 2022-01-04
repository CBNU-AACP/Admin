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
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const addTable = createAsyncThunk(
  `${name}/addTable`,
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/v1/table", data);
      console.log(response);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const removeTable = createAsyncThunk(
  `${name}/removeTable`,
  async (tableName, thunkAPI) => {
    try {
      const response = await axios.delete(`/v1/table/${tableName}`);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const getSchemaPKs = createAsyncThunk(
  `${name}/getSchemaPKs`,
  async (tableName, thunkAPI) => {
    try {
      const response = await axios.post(`/v1/row/getPKs/`, { name: tableName });
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  isLoading: false,
  errorMessage: "",
  tables: [],
  currentTable: "createTable",
  currentSchemaData: {},
  currentSchemaPKs: [],
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
      state.errorMessage = "";
      state.tables = [...action.payload];
      state.currentTable = "createTable";
      state.currentSchemaData = [];
    },
    [getTables.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.tables = [];
      console.log(action.payload);
      // state.errorMessage = action.payload.message;
      state.currentTable = "createTable";
      state.currentSchemaData = [];
    },

    [addTable.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [addTable.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "";
      state.tables = [...state.tables, action.payload.name].sort();
    },
    [addTable.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    },

    [removeTable.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [removeTable.fulfilled.type]: (state, action) => {
      state.errorMessage = "";
      state.tables = [
        ...state.tables.filter(table => table !== action.payload.name),
      ];
      state.currentTable = "createTable";
      state.isLoading = false;
    },
    [removeTable.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    },

    [getSchemaPKs.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getSchemaPKs.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "";
      state.currentSchemaData = {
        original: action.payload.columns,
        attributes: dataToSchema(action.payload.columns),
        schemaKey: dataToKey(action.payload.columns),
      };
      state.currentSchemaPKs = action.payload.PKs;
    },
    [getSchemaPKs.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
      state.currentSchemaData = {};
    },
  },
});

export const { setTable, setCurrentSchemaData } = tableSlice.actions;
