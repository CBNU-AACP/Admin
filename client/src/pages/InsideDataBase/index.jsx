import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Navigation";
import AddTable from "../../components/AddTable";
import { getTables } from "../../store/tableSlice";
import MainContainer from "../../components/MainContainer";
import Error from "../../components/Error";

export default function InsideDataBase() {
  const [message, setMessage] = useState("");
  const { dbName } = useParams();
  const dispatch = useDispatch();
  const { errorMessage, currentTable } = useSelector(state => state.table);

  useEffect(() => {
    dispatch(getTables())
      .unwrap()
      .then(() => {
        setMessage("");
      })
      .catch(() => {
        setMessage("테이블 불러오기에 실패했습니다.");
      });
  }, [dbName]);

  return (
    <div className="mainPage">
      <header className="titleBox">
        <div className="title">
          <span className="dbName">{dbName}</span>
          <span>DB 조회</span>
        </div>
      </header>
      {message === "" ? (
        <main className="mainContent">
          <Navigation />
          {currentTable === "createTable" ? <AddTable /> : <MainContainer />}
        </main>
      ) : (
        <Error message={message} error={errorMessage} />
      )}
    </div>
  );
}
