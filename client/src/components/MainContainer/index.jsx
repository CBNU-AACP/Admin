import React, { useContext, useState, useEffect, useRef } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import SchemaMocks from "../../__mocks/SchemaMocks";
import { getPKs, getSchema } from "../../store/tableSlice";
import Loading from "../Loading";
import Schema from "../Schema";
import "./style.scss";
import DataCardList from "../DataCardList";

export default function MainContainer() {
  const dispatch = useDispatch();
  const [menuSelect, setMenuSelect] = useState("");
  const [message, setMessage] = useState("");
  const { isLoading, currentTable } = useSelector(state => state.table);
  const { schemaKey } = useSelector(state => state.table.currentSchemaData);

  useEffect(() => {
    setMenuSelect("schema");
    dispatch(getSchema(currentTable))
      .unwrap()
      .then(() => {
        setMessage("");
      })
      .catch(() => {
        setMessage("스키마 불러오기에 실패했습니다.");
      });
  }, [currentTable]);

  useEffect(() => {
    if (schemaKey) {
      console.log({ [currentTable]: schemaKey.FK });
      // dispatch(getPKs({ [currentTable]: schemaKey.FK }));
    }
  }, [schemaKey]);

  if (!isLoading && message === "")
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
        {!isLoading && menuSelect === "schema" && <Schema />}
        {!isLoading && menuSelect === "data" && <DataCardList />}
      </main>
    );
  if (!isLoading && message !== "")
    return <div className="error">{message}</div>;
  if (isLoading) return <Loading />;
}
