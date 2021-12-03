import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./style.scss";
import Navigation from "../../components/Navigation";

export default function InsideDataBase(props) {
  const { dbName } = useParams();

  //   useEffect(() => {}, [dbName]); api 연결

  return (
    <div className="mainPage">
      <div className="titleBox">
        <div className="title">
          <span className="dbName">{dbName}</span>
          <span>내부 조회</span>
        </div>
      </div>
      <Navigation />
    </div>
  );
}
