import React, { useContext, useState, useEffect, useRef } from "react";
import cx from "classnames";
import "./style.scss";
import { AiOutlineDatabase } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setTable } from "../../store/tableSlice";

export default function Loading() {
  return <div className="loading">로딩 중..</div>;
}
