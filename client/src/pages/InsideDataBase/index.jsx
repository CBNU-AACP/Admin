import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import Navigation from "../../components/Navigation";
import AddTable from "../../components/AddTable";
import TableMocks from "../../__mocks/TableMocks";
import { getTables } from "../../store/tableSlice";
import Schema from "../../components/Schema";

export default function InsideDataBase(props) {
  const { dbName } = useParams();
  const dispatch = useDispatch();
  const currentTable = useSelector(state => state.table.currentTable);

  useEffect(() => {
    dispatch(getTables(TableMocks));
  }, [dbName]);

  return (
    <div className="mainPage">
      <header className="titleBox">
        <div className="title">
          <span className="dbName">{dbName}</span>
          <span>DB 조회</span>
        </div>
      </header>
      <section className="buttonBar"></section>
      <main className="mainContent">
        <Navigation />
        {currentTable === "createTable" ? (
          <AddTable />
        ) : (
          <Schema table={currentTable} />
        )}
      </main>
    </div>
  );
}
