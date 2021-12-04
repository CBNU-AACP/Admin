import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./style.scss";
import { useDispatch } from "react-redux";
import Navigation from "../../components/Navigation";
import AddTable from "../../components/AddTable";
import TableMocks from "../../__mocks/TableMocks";
import { getTables } from "../../store/tableSlice";

export default function InsideDataBase(props) {
  const { dbName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTables(TableMocks));
  }, [dbName]);

  return (
    <div className="mainPage">
      <header className="titleBox">
        <div className="title">
          <span className="dbName">{dbName}</span>
          <span>내부 조회</span>
        </div>
      </header>
      <section className="buttonBar"></section>
      <main className="mainContent">
        <Navigation />
        <AddTable />
      </main>
    </div>
  );
}
