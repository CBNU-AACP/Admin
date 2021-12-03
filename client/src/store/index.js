import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import logger from "./loggerMiddleware";

export const store = configureStore({
  reducer: {},
  middleware: new MiddlewareArray().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
