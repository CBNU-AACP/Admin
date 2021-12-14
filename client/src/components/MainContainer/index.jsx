import React, { useContext, useState, useEffect, useRef } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import SchemaMocks from "../../__mocks/SchemaMocks";
import { setCurrentSchemaData, getSchema } from "../../store/tableSlice";
import { dataToKey, dataToSchema } from "../../utils";
import Schema from "../Schema";
import "./style.scss";
import DataCardList from "../DataCardList";

export default function mainContainer() {
  const dispatch = useDispatch();
  const [menuSelect, setMenuSelect] = useState("");
  const { isLoading, currentTable } = useSelector(state => state.table);

  useEffect(() => {
    setMenuSelect("schema");
    dispatch(getSchema(currentTable));
  }, [currentTable]); // schema thunk api 요청

  return (
    // }
    <main className="mainContainer">
      {!isLoading ? (
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
      ) : (
        <div>Loading..</div>
      )}
      {!isLoading && menuSelect === "schema" && <Schema />}
      {!isLoading && menuSelect === "data" && <DataCardList />}
    </main>
  );
}
