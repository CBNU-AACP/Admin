import axios from "axios";
import { getCookie } from "./cookies";

export default axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    accessToken: getCookie("accessToken") || "",
    refreshToken: getCookie("refreshToken") || "",
  },
});
