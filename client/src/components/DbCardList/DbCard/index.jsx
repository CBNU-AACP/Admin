import React, { useState, useEffect } from "react";
import cx from "classnames";
import http from "../../../common/http";
import "./style.scss";

export default function DataBase({ isNew, database, id, remove, add }) {
  const [dbName, setDbName] = useState("");
  const [msgState, setMsgState] = useState("");
  const [isAddClick, setIsAddClick] = useState(false);

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
            placeholder="클릭하여 DB이름 입력."
            onChange={handleInputChange}
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
            <p className="text">입력완료</p>
          </div>
        </>
      ) : (
        <span className="cardText">{dbName}</span>
      )}
    </div>
  );
}
