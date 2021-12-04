import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import logger from "./loggerMiddleware";
import { tableSlice } from "./tableSlice";

export const store = configureStore({
  reducer: {
    table: tableSlice.reducer,
  },
  middleware: new MiddlewareArray().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
