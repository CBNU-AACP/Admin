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
import MainContainer from "../../components/MainContainer";

export default function InsideDataBase() {
  const { dbName } = useParams();
  const dispatch = useDispatch();
  const currentTable = useSelector(state => state.table.currentTable);

  useEffect(() => {
    // dispatch(getTables(TableMocks));
    dispatch(getTables());
  }, [dbName]);

  return (
    <div className="mainPage">
      <header className="titleBox">
        <div className="title">
          <span className="dbName">{dbName}</span>
          <span>DB 조회</span>
        </div>
      </header>
      <main className="mainContent">
        <Navigation />
        {currentTable === "createTable" ? <AddTable /> : <MainContainer />}
      </main>
    </div>
  );
}
