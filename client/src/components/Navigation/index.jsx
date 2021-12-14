import React, { useContext, useState, useEffect, useRef } from "react";
import cx from "classnames";
import "./style.scss";
import { AiOutlineDatabase } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setTable } from "../../store/tableSlice";

export default function Natigation() {
  const dispatch = useDispatch();
  const tables = useSelector(state => state.table.tables);
  const currentTable = useSelector(state => state.table.currentTable);

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
    </nav>
  );
}
