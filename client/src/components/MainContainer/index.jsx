import React, { useContext, useState, useEffect, useRef } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import SchemaMocks from "../../__mocks/SchemaMocks";
import { setCurrentSchemaData } from "../../store/tableSlice";
import { dataToKey, dataToSchema } from "../../utils";
import Schema from "../Schema";
import "./style.scss";
import DataCardList from "../DataCardList";

export default function mainContainer() {
  const dispatch = useDispatch();
  const [menuSelect, setMenuSelect] = useState("schema");
  const currentTable = useSelector(state => state.table.currentTable);

  useEffect(() => {
    setMenuSelect("schema");
    dispatch(
      setCurrentSchemaData({
        original: SchemaMocks,
        attributes: dataToSchema(SchemaMocks),
        schemaKey: dataToKey(SchemaMocks),
      }),
    );
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
