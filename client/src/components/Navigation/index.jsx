import React, { useContext, useState, useEffect, useRef } from "react";
import cx from "classnames";
import "./style.scss";
import { AiOutlineDatabase } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setTable } from "../../store/tableSlice";
import Loading from "../Loading";

export default function Natigation() {
  const dispatch = useDispatch();
  const { tables, currentTable, isLoading } = useSelector(state => state.table);

  return (
    <nav className="navigation">
      <button
        type="button"
        className={cx("addTable", {
          isFocus: currentTable === "createTable",
        })}
        onClick={() => {
          dispatch(setTable("createTable"));
        }}>
        <AiOutlineDatabase />
        <p className="addText">테이블 추가</p>
      </button>
      <p className="naviTitle">테이블 목록</p>
      {isLoading ? (
        <Loading />
      ) : (
        <ul className="sideMenu">
          {tables.map(table => (
            <li
              key={table}
              className={cx("tableTitle", {
                isFocus: table === currentTable,
              })}
              onClick={() => {
                dispatch(setTable(table));
              }}
              aria-hidden="true">
              {table}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
