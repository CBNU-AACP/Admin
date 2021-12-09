import React, { useContext, useState, useEffect, useRef } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import Schema from "../Schema";
import "./style.scss";

export default function mainContainer() {
  const [menuSelect, setMenuSelect] = useState("schema");
  const currentTable = useSelector(state => state.table.currentTable);

  useEffect(() => {
    setMenuSelect("schema");
  }, [currentTable]);

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
    </main>
  );
}
