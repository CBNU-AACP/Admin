/* eslint-disable no-param-reassign */
import React, { useContext, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";
import cx from "classnames";
import Loading from "../../Loading";
import "./style.scss";

export default function ColumnElement({ element, remove }) {
  const tables = useSelector(state => state.table.tables);
  const [isDisabled, setDisabled] = useState(false);

  function pkSelect(isPK) {
    element.PK = isPK.target.value;
    setDisabled(!isDisabled);
    if (isPK.target.value) {
      element.FK = "false";
      element.constraint = "false";
      document.getElementById(`fkId${element.clientId}`).value = "false";
      document.getElementById(`conId${element.clientId}`).value = "false";
    }
  }

  return (
    tables.length !== 0 && ( // 조건이 0이 아니면 X 나중에 고쳐야 한다.
      <div className="columnBox">
        <form className="column">
          <div className="element">
            <span className="label bold">컬럼명: </span>
            <input
              className="input"
              type="text"
              placeholder="컬럼 명 입력."
              onChange={e => {
                element.columnName = e.target.value;
              }}
            />
          </div>

          <div className="element">
            <span className="label bold">타입: </span>
            <select
              className="select"
              id={`dataId${element.clientId}`}
              name="data"
              defaultValue="int"
              onChange={e => {
                element.dataType = e.target.value;
              }}>
              <option value="int(20)">INT(20)</option>
              <option value="double">DOUBLE</option>
              <option value="decimal">DECIMAL</option>
              <option value="text">TEXT</option>
              <option value="char(30)">CHAR(30)</option>
              <option value="varchar(30)">VARCHAR(30)</option>
              <option value="datetime">DATETIME</option>
              <option value="date">DATE</option>
            </select>
          </div>

          <div className="element">
            <span className="label">제약조건: </span>
            <select
              className="select"
              id={`conId${element.clientId}`}
              name="constraint"
              defaultValue="false"
              onChange={e => {
                element.constraint = e.target.value;
              }}>
              <option value="false">X</option>
              <option value="NOT NULL" disabled={isDisabled}>
                NOT NULL
              </option>
              <option value="UNIQUE" disabled={isDisabled}>
                UNIQUE
              </option>
            </select>
          </div>

          {/* <div className="element">
          <span className="label">DEFAULT값: </span>
          <input
            className="input"
            type="text"
            placeholder="기본 값 입력."
            onChange={e => {
              element.default = e.target.value;
            }}
          />
        </div> */}

          <div className="element">
            <span className="label bold">PK: </span>
            <select
              className="select"
              id={`pkId${element.clientId}`}
              name="PK"
              onChange={pkSelect}
              defaultValue="false">
              <option value="true">O</option>
              <option value="false">X</option>
            </select>
          </div>

          <div className="element">
            <span className="label bold">FK: </span>
            <select
              className="select"
              id={`fkId${element.clientId}`}
              name="FK"
              defaultValue="false"
              onChange={e => {
                element.FK = e.target.value;
              }}>
              <option value="false">X</option>
              {tables.map(table => (
                <option
                  key={`${table}option`}
                  disabled={isDisabled}
                  value={table}>
                  {table}
                </option>
              ))}
            </select>
          </div>
        </form>
        <MdOutlineCancel
          className="cancel"
          onClick={() => remove(element.clientId)}
        />
      </div>
    )
  );
}
