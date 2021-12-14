import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoAddOutline } from "react-icons/io5";
import { getData, addData, removeData } from "../../store/dataSlice";
import { deleteKey, searchKeyPK } from "../../utils";
import DataCard from "./DataCard";
import "./style.scss";

export default function DataCardList() {
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  const nextId = useRef(0);
  const { currentTable, currentSchemaData } = useSelector(state => state.table);
  const { isLoading, currentDataList } = useSelector(state => state.data);
  const [dataList, setDataList] = useState([]);
  const { attributes, schemaKey } = currentSchemaData;

  useEffect(() => {
    nextId.current = 0;
    dispatch(getData(currentTable)).then(res => {
      setDataList(
        res.payload.map(data => {
          nextId.current += 1;
          return { clientId: nextId.current, ...data };
        }),
      );
    });
  }, []);

  useEffect(() => {
    console.log(dataList);
  }, [dataList]);

  const addNewData = data => {
    dispatch(
      addData({
        tableName: currentTable,
        rows: deleteKey([data], ["clientId", "createdAt", "updatedAt"]),
      }),
    ).then(() => {
      nextId.current = 0;
      dispatch(getData(currentTable)).then(res => {
        setDataList(
          res.payload.map(data => {
            nextId.current += 1;
            return { clientId: nextId.current, ...data };
          }),
        );
      });
    });
  };

  const remove = (remove, pk) => {
    dispatch(
      removeData({
        tableName: currentTable,
        [searchKeyPK(schemaKey)]: pk,
      }),
    ).then(() => {
      nextId.current = 0;
      dispatch(getData(currentTable)).then(res => {
        setDataList(
          res.payload.map(data => {
            nextId.current += 1;
            return { clientId: nextId.current, ...data };
          }),
        );
      });
    });
  };

  const newData = () => {
    nextId.current += 1;
    setDataList([...dataList, { clientId: nextId.current, ...attributes }]);
  };

  return !isLoading && attributes ? (
    <>
      <h2 className="dataListTitle">{currentTable} 테이블의 데이터 목록</h2>
      <div className="dataList">
        {dataList.map(data => (
          <DataCard
            isNew={currentDataList.length < data.clientId}
            data={data}
            key={data + data.clientId}
            clientId={data.clientId}
            add={addNewData}
            remove={remove}
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
