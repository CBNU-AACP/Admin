/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import DataBasesMocks from "../../__mocks/DataBasesMocks";
import DataBase from "./DbCard";
import { getDataBases } from "../../store/dbSlice";
import "./style.scss";

export default function DataBases() {
  const dispatch = useDispatch();
  const [dbData, setDBData] = useState([]);
  const nextId = useRef(0);
  const databases = useSelector(state => state.database.databases);

  useEffect(() => {
    dispatch(getDataBases()).then(res => {
      console.log(res);
      setDBData(
        res.payload.map(db => {
          nextId.current += 1;
          console.log(nextId.current);
          return { id: nextId.current, name: db };
        }),
      );
    });
  }, []);

  useEffect(() => {
    console.log(dbData);
  }, [dbData]);

  const addDb = (id, name) => {
    // api 연결
    console.log(id, name);
  };

  const removeDb = remove => {
    setDBData(dbData.filter(db => db.id !== remove));
  };

  const newDb = () => {
    nextId.current += 1;
    setDBData([...dbData, { id: nextId.current, name: "" }]);
  };

  return dbData.length != 0 ? (
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
  ) : (
    <div>Loading..</div>
  );
}
