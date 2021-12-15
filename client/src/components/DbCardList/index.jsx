/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import DataBasesMocks from "../../__mocks/DataBasesMocks";
import DataBase from "./DbCard";
import { getDataBases } from "../../store/dbSlice";
import "./style.scss";
import Loading from "../Loading";

export default function DataBases() {
  const dispatch = useDispatch();
  const [dbData, setDBData] = useState([]);
  const nextId = useRef(0);
  const { isLoading, databases } = useSelector(state => state.database);

  useEffect(() => {
    dispatch(getDataBases())
      .then(res => {
        console.log(res);
        setDBData(
          res.payload.map(db => {
            nextId.current += 1;
            console.log(nextId.current);
            return { clientId: nextId.current, name: db };
          }),
        );
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    console.log(dbData);
  }, [dbData]);

  const addDb = (clientId, name) => {
    // api 연결
    console.log(clientId, name);
  };

  const removeDb = remove => {
    setDBData(dbData.filter(db => db.clientId !== remove));
  };

  const newDb = () => {
    nextId.current += 1;
    setDBData([...dbData, { clientId: nextId.current, name: "" }]);
  };

  return !isLoading ? (
    <>
      <div className="dbList">
        {dbData.map(database => (
          <DataBase
            isNew={database.name === ""}
            database={database.name}
            key={database.clientId + database.name}
            clientId={database.clientId}
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
    <Loading />
  );
}
