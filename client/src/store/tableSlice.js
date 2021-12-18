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
      console.log(err.response.data);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const addTable = createAsyncThunk(
  `${name}/addTable`,
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/v1/table", data);
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

export const getSchema = createAsyncThunk(
  `${name}/getSchema`,
  async (tablename, thunkAPI) => {
    try {
      const response = await axios.get(`/v1/table/single/${tablename}`);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const getPKs = createAsyncThunk(
  `${name}/getPKs`,
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/v1/row/getPKs", data);
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
      state.errorMessage = action.payload.message;
      state.tables = action.payload;
      state.currentTable = "createTable";
      state.currentSchemaData = [];
    },

    [addTable.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [addTable.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "";
      state.tables = [...state.tables, action.payload.data.name].sort();
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
        ...state.tables.filter(table => table !== action.payload.data.name),
      ];
      state.currentTable = "createTable";
      state.isLoading = false;
    },
    [removeTable.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    },

    [getSchema.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getSchema.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "";
      state.currentSchemaData = {
        original: action.payload,
        attributes: dataToSchema(action.payload),
        schemaKey: dataToKey(action.payload),
      };
    },
    [getSchema.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
      state.currentSchemaData = {};
    },

    [getPKs.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getPKs.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "";
      state.currentSchemaPKs = action.payload;
    },
    [getPKs.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
      state.currentSchemaPKs = [];
    },
  },
});

export const { setTable, setCurrentSchemaData } = tableSlice.actions;
