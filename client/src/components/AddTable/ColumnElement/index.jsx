/* eslint-disable no-param-reassign */
import React, { useContext, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { GiCancel } from "react-icons/gi";
import cx from "classnames";
import "./style.scss";

export default function ColumnElement({ element, remove }) {
  const tables = useSelector(state => state.table.tables);
  const [isDisabled, setDisabled] = useState(false);

  function pkSelect(isPK) {
    element.PK = isPK.target.value;
    console.log(element);
    setDisabled(!isDisabled);
    if (isPK.target.value) {
      element.FK = false;
      element.constraint = false;
      document.getElementById(`fkId${element.id}`).value = false;
      document.getElementById(`conId${element.id}`).value = false;
    }
  }

  return (
    <div className="columnBox">
      <form className="column">
        <div className="element">
          <span className="label"># 컬럼명: </span>
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
          <span className="label">타입: </span>
          <select
            className="select"
            id={`dataId${element.id}`}
            name="data"
            defaultValue="int"
            onChange={e => {
              element.dataType = e.target.value;
            }}>
            <option value="int">INT</option>
            <option value="char">CHAR</option>
            <option value="date">DATE</option>
          </select>
        </div>

        <div className="element">
          <span className="label">제약조건: </span>
          <select
            className="select"
            id={`conId${element.id}`}
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

        <div className="element">
          <span className="label">DEFAULT값: </span>
          <input
            className="input"
            type="text"
            placeholder="기본 값 입력."
            onChange={e => {
              element.default = e.target.value;
            }}
          />
        </div>

        <div className="element">
          <span className="label">PK: </span>
          <select
            className="select"
            id={`pkId${element.id}`}
            name="PK"
            onChange={pkSelect}
            defaultValue="false">
            <option value="true">O</option>
            <option value="false">X</option>
          </select>
        </div>

        <div className="element">
          <span className="label">FK: </span>
          <select
            className="select"
            id={`fkId${element.id}`}
            name="FK"
            defaultValue="false"
            onChange={e => {
              element.FK = e.target.value;
            }}>
            <option value="false">X</option>
            {tables.map(table => (
              <option
                key={`${table.title}option`}
                disabled={isDisabled}
                value={table.title}>
                {table.title}
              </option>
            ))}
          </select>
        </div>
      </form>
      <GiCancel className="cancel" onClick={() => remove(element.id)} />
    </div>
  );
}
