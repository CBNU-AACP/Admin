import React, { useState, useEffect } from "react";
import cx from "classnames";
import DataBasesMocks from "../../__mocks/DataBasesMocks";
import DataBase from "./DbCard";
import http from "../../common/http";
import "./style.scss";

export default function DataBases() {
  const [dbData, setDBData] = useState(DataBasesMocks);
  const removeDb = remove => {
    setDBData(dbData.filter(db => db.id !== remove));
  };

  return (
    <div className="dbList">
      {dbData.map(database => (
        <DataBase
          database={database.title}
          key={database.id + database.title}
          id={database.id}
          remove={removeDb}
        />
      ))}
    </div>
  );
}
