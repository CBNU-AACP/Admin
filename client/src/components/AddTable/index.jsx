import React, { useContext, useState, useEffect, useRef } from "react";
import cx from "classnames";
import "./style.scss";
import ColumnElement from "./ColumnElement";

export default function AddTable() {
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([]);
  const nextId = useRef(1);

  let isNullColumnName = true;

  const removeColumn = remove => {
    setColumns(columns.filter(column => column.id !== remove));
  };

  const handleSubmitColumn = () => {
    columns.forEach(column => {
      if (column.columnName.length === 0) {
        isNullColumnName = true;
        return;
      }
      if (column.columnName.length !== 0) isNullColumnName = false;
    });
    if (tableName.length >= 1 && !isNullColumnName)
      console.log({ tableName, ...columns });
  };

  const initialState = {
    columnName: "",
    dataType: "",
    constraint: false,
    default: "",
    PK: false,
    FK: false,
  };

  return (
    <div className="addContainer">
      <div className="tableInputBox">
        <span className="tableLabel">테이블 이름: </span>
        <input
          className="input tableInput"
          type="text"
          placeholder="테이블 명 입력."
          value={tableName}
          onChange={e => {
            setTableName(e.target.value);
          }}
        />
        <button
          className="addBox"
          type="button"
          onClick={() => {
            setColumns([...columns, { id: nextId.current, ...initialState }]);
            nextId.current += 1;
          }}>
          <div className="addCircle" />
          <span className="addText">컬럼 추가</span>
        </button>
      </div>

      <ul>
        {columns.map(column => (
          <ColumnElement
            key={column.id + column}
            element={column}
            remove={removeColumn}
          />
        ))}
      </ul>

      <button
        className="addBox table"
        type="button"
        onClick={handleSubmitColumn}>
        <div className="addCircle table" />
        <span className="addText">테이블 추가</span>
      </button>
    </div>
  );
}
