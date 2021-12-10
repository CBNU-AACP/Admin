import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import cx from "classnames";
import DataMocks from "../../__mocks/DataMocks";
import DataCard from "./DataCard";
import axios from "../../common/axios";
import "./style.scss";

export default function DataCardList() {
  const [dataList, setDataList] = useState(DataMocks); // thunk api로 대체
  const nextId = useRef(dataList.length + 1);
  const currentTable = useSelector(state => state.table.currentTable);

  const removeData = remove => {
    setDataList(dataList.filter(db => db.id !== remove));
  };

  const newData = () => {
    setDataList([...dataList, { id: nextId.current, name: "" }]);
    nextId.current += 1;
  };

  return (
    <>
      <h2 className="dataListTitle">{currentTable} 테이블의 데이터 목록</h2>
      <div className="dataList">
        {dataList.map(data => (
          <DataCard
            isNew={data.name === ""}
            data={data}
            key={data}
            id={data.id}
            remove={removeData}
          />
        ))}
      </div>
      <button
        className="createData"
        type="button"
        onClick={newData}
        aria-hidden="true">
        <div className="create" />
        <p className="createText">DB 추가하기</p>
      </button>
    </>
  );
}
