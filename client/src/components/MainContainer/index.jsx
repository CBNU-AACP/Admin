import React, { useContext, useState, useEffect, useRef } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import SchemaMocks from "../../__mocks/SchemaMocks";
import { getCurrentSchemaData, setCurrentSchema } from "../../store/tableSlice";
import dataToSchema from "../../utils/dataToSchema";
import Schema from "../Schema";
import "./style.scss";
import DataCardList from "../DataCardList";

export default function mainContainer() {
  const dispatch = useDispatch();
  const [menuSelect, setMenuSelect] = useState("schema");
  const currentTable = useSelector(state => state.table.currentTable);

  useEffect(() => {
    setMenuSelect("schema");
    dispatch(getCurrentSchemaData(SchemaMocks)); // 스키마 데이터 thunk api 요청
    dispatch(setCurrentSchema(dataToSchema(SchemaMocks))); // 스키마 데이터 가져오고 나서 스키마 field영역만 디스패치
  }, [currentTable]); // schema thunk api 요청

  return (
    <main className="mainContainer">
      <div className="selector">
        <span
          className={cx("selectTag", { isFocus: menuSelect === "schema" })}
          onClick={() => {
            setMenuSelect("schema");
          }}
          aria-hidden="true">
          스키마 조회
        </span>
        <span
          className={cx("selectTag", { isFocus: menuSelect === "data" })}
          onClick={() => {
            setMenuSelect("data");
          }}
          aria-hidden="true">
          데이터 조회
        </span>
        <span
          className={cx("selectTag", { isFocus: menuSelect === "api" })}
          onClick={() => {
            setMenuSelect("api");
          }}
          aria-hidden="true">
          API 문서
        </span>
      </div>
      {menuSelect === "schema" && <Schema />}
      {menuSelect === "data" && <DataCardList />}
    </main>
  );
}
