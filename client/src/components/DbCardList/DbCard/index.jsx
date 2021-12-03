/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cx from "classnames";
import http from "../../../common/axios";
import "./style.scss";

export default function DataBase({ isNew, database, id, remove, add }) {
  const [dbName, setDbName] = useState("");
  const [msgState, setMsgState] = useState("");
  const [isAddClick, setIsAddClick] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isNew && !isAddClick) {
      setMsgState("입력 중");
      return;
    }
    if (!isNew) {
      setMsgState("DB");
      setDbName(database);
      return;
    }
    if (isAddClick) setMsgState("추가 중");
  }, [isNew, isAddClick]);

  const handleInputChange = event => {
    const { value } = event.target;
    setDbName(value);
  };

  const handleClick = dbName => {
    if (!isAddClick) navigate(`/${dbName}`);
  };

  return (
    <div className="cardBox">
      <div className="btnBox">
        {!isAddClick && (
          <>
            <div
              className="circle drop"
              onClick={() => remove(id)}
              aria-hidden="true"
            />
            <p className="text">삭제</p>
          </>
        )}
        <p className="dbText">{msgState}</p>
      </div>
      {!isAddClick && isNew ? (
        <>
          <input
            className="cardText input"
            value={dbName}
            placeholder="클릭하여 추가할 DB이름 입력."
            onChange={handleInputChange}
            autoFocus
          />
          <div className="btnBox addBox">
            <div
              className="circle add"
              onClick={() => {
                if (dbName !== "") {
                  add(id, dbName);
                  setIsAddClick(true);
                }
              }}
              aria-hidden="true"
            />
            <p className="text">추가</p>
          </div>
        </>
      ) : (
        <span
          className="cardText"
          onClick={() => handleClick(dbName)}
          aria-hidden="true">
          {dbName}
        </span>
      )}
    </div>
  );
}
