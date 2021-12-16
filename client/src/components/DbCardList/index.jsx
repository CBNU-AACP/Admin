/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataBase from "./DbCard";
import { getDataBases } from "../../store/dbSlice";
import "./style.scss";
import Loading from "../Loading";

export default function DataBases() {
  const dispatch = useDispatch();
  const [dbData, setDBData] = useState([]);
  const [message, setMessage] = useState("");
  const nextId = useRef(0);
  const { isLoading, databases } = useSelector(state => state.database);

  useEffect(() => {
    dispatch(getDataBases())
      .unwrap()
      .then(res => {
        if (res.length === 0) {
          setDBData([]);
          setMessage("데이터베이스가 없습니다.");
          return;
        }
        setDBData(
          res.map(db => {
            nextId.current += 1;
            return { clientId: nextId.current, name: db };
          }),
        );
        setMessage("");
      })
      .catch(e => {
        console.log(e);
        setDBData([]);
        setMessage("데이터베이스 불러오기에 실패했습니다.");
      });
  }, []);

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

  if (!isLoading && message === "")
    return (
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
    );
  if (!isLoading && message !== "")
    return <div className="error">{message}</div>;
  if (isLoading) return <Loading className="dbLoading"/>;
}
