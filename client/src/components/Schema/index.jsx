import React, { useContext, useState, useEffect, useRef } from "react";
import cx from "classnames";
import { useSelector } from "react-redux";
import "./style.scss";

export default function Schema() {
  const [isLoading, setLoading] = useState(true);
  const currentTable = useSelector(state => state.table.currentTable);
  const currentSchemaData = useSelector(state => state.table.currentSchemaData);
  const { original } = currentSchemaData;

  const remove = () => {
    // currentTable을 파라미터로 보낸다.
    console.log(currentTable);
  };

  useEffect(() => {
    if (original) setLoading(false);
  }, [original]);

  return !isLoading ? (
    <div className="schemaContainer">
      <div className="btnBox">
        <div className="circle drop" onClick={remove} aria-hidden="true" />
        <p className="text">삭제</p>
      </div>
      <p className="tableName bold">{currentTable} 테이블</p>
      <p className="schemaLabel">스키마 조회</p>
      <ul>
        {original.map(attribute => (
          <li key={attribute.Field + attribute.Null}>
            <form className="attribute">
              <span className="attributeLabel bold">{attribute.Field}</span>
              <span className="attributeLabel">
                {attribute.Type.toUpperCase()}
              </span>
              <span className="attributeLabel">
                {attribute.Null === "NO" ? "NOT NULL" : "NULL 허용 "}
              </span>
              {attribute.Default && (
                <span className="attributeLabel">
                  DEFAULT: {attribute.Default}
                </span>
              )}
              {attribute.key && (
                <span className="attributeLabel bold">
                  {attribute.key === "PRI" ? "PRIMARY KEY" : "FOREIGN KEY"}
                </span>
              )}
              {attribute.Extra && (
                <span className="attributeLabel">{attribute.Extra}</span>
              )}
            </form>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>Loading..</div>
  );
}
