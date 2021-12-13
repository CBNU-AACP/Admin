import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import cx from "classnames";
import { IoAddOutline } from "react-icons/io5";
import DataMocks from "../../__mocks/DataMocks";
import DataCard from "./DataCard";
import axios from "../../common/axios";
import "./style.scss";

export default function DataCardList() {
  const [isLoading, setLoading] = useState(true);
  const [dataList, setDataList] = useState(
    DataMocks.map((data, idx) => ({ id: idx + 1, ...data })),
  ); // thunk api로 대체
  const nextId = useRef(dataList.length + 1);
  const currentTable = useSelector(state => state.table.currentTable);
  const currentSchemaData = useSelector(state => state.table.currentSchemaData);
  const { attributes } = currentSchemaData;

  useEffect(() => {
    if (attributes) setLoading(false);
  }, [attributes]);

  const addData = data => {
    // thunk api 연결
    console.log(data);
  };

  const removeData = remove => {
    // api 연동
    setDataList(dataList.filter(db => db.id !== remove));
  };

  const newData = () => {
    // api 연동
    setDataList([...dataList, { id: nextId.current, ...attributes }]);
    nextId.current += 1;
  };

  return !isLoading ? (
    <>
      <h2 className="dataListTitle">{currentTable} 테이블의 데이터 목록</h2>
      <div className="dataList">
        {dataList.map(data => (
          <DataCard
            isNew={DataMocks.length < data.id}
            data={data}
            key={data + data.id}
            id={data.id}
            add={addData}
            remove={removeData}
          />
        ))}
      </div>
      <button
        className="createData"
        type="button"
        onClick={newData}
        aria-hidden="true">
        <IoAddOutline className="createText" />
      </button>
    </>
  ) : (
    <div>Loading..</div>
  );
}
