import React, { useContext, useState, useEffect, useRef } from "react";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { removeTable } from "../../store/tableSlice";
import Loading from "../Loading";
import Error from "../Error";
import "./style.scss";

export default function Schema() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { currentTable, errorMessage } = useSelector(state => state.table);
  const { original } = useSelector(state => state.table.currentSchemaData);

  useEffect(() => {
    if (original) {
      setMessage("");
    }
    setLoading(false);
  }, [original]);

  const remove = () => {
    setLoading(true);
    dispatch(removeTable(currentTable))
      .unwrap()
      .then(() => {
        setMessage("테이블 삭제 성공했습니다.");
      })
      .catch(() => {
        setMessage("테이블 삭제에 실패했습니다.");
      });
  };

  if (!isLoading && message === "")
    return (
      <div className="schemaContainer">
        <div className="btnBox">
          <div className="circle drop" onClick={remove} aria-hidden="true" />
          <p className="text">삭제</p>
        </div>
        <p className="tableName bold">{currentTable} 테이블</p>
        <p className="schemaLabel">스키마 조회</p>
        <table className="attributeList">
          <tbody>
            <tr>
              <td className="attribute head">컬럼명</td>
              <td className="attribute head">타입</td>
              <td className="attribute head">NULL 여부</td>
              <td className="attribute head">DEFAULT 값</td>
              <td className="attribute head">KEY 값</td>
            </tr>
            {original.map(attribute => (
              <tr key={attribute.Field + attribute.Null}>
                <td className="attribute bold">{attribute.Field}</td>
                <td className="attribute">{attribute.Type.toUpperCase()}</td>
                <td className="attribute">
                  {attribute.Null === "NO" ? "NOT NULL" : "NULL 허용 "}
                </td>
                <td className="attribute">
                  {attribute.Default ? attribute.Default : "X"}
                </td>
                <td className="attribute bold">
                  {attribute.Key === "PRI" && "PRIMARY KEY"}
                  {attribute.Key === "MUL" && "FOREIGN KEY"}
                  {attribute.Key === "UNI" && "UNIQUE"}
                  {!attribute.Key && "X"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (!isLoading && message !== "")
    return <Error message={message} error={errorMessage} />;
  if (isLoading) return <Loading />;
}
