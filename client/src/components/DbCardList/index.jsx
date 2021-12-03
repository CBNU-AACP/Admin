import React, { useState, useEffect, useRef } from "react";
import cx from "classnames";
import DataBasesMocks from "../../__mocks/DataBasesMocks";
import DataBase from "./DbCard";
import http from "../../common/axios";
import "./style.scss";

export default function DataBases() {
  const [dbData, setDBData] = useState(DataBasesMocks);
  const nextId = useRef(dbData.length + 1);

  const addDb = (id, name) => {
    // api 연결
    console.log(id, name);
  };

  const removeDb = remove => {
    setDBData(dbData.filter(db => db.id !== remove));
  };

  const newDb = () => {
    setDBData([...dbData, { id: nextId.current, name: "" }]);
    nextId.current += 1;
  };

  return (
    <>
      <div className="dbList">
        {dbData.map(database => (
          <DataBase
            isNew={database.name === ""}
            database={database.name}
            key={database.id + database.name}
            id={database.id}
            add={addDb}
            remove={removeDb}
          />
        ))}
      </div>
      <button
        className="createDb"
        type="button"
        onClick={newDb}
        aria-hidden="true">
        <div className="create" />
        <p className="createText">DB 추가하기</p>
      </button>
    </>
  );
}
