import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import { dbSlice } from "./dbSlice";
import logger from "./loggerMiddleware";
import { tableSlice } from "./tableSlice";
import { dataSlice } from "./dataSlice";

export const store = configureStore({
  reducer: {
    database: dbSlice.reducer,
    table: tableSlice.reducer,
    data: dataSlice.reducer,
  },
  // middleware: new MiddlewareArray(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  // middleware:
  // devTools: process.env.NODE_ENV !== "production",
});
