import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoAddOutline } from "react-icons/io5";
import { getData, addData, removeData } from "../../store/dataSlice";
import Loading from "../Loading";
import { deleteKey, searchKeyPK } from "../../utils";
import DataCard from "./DataCard";
import "./style.scss";

export default function DataCardList() {
  const [dataList, setDataList] = useState([]);
  const [reload, setReload] = useState(true);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const nextId = useRef(0);
  const { currentTable, currentSchemaData } = useSelector(state => state.table);
  const { isLoading, currentDataList } = useSelector(state => state.data);
  const { attributes, schemaKey } = currentSchemaData;

  useEffect(() => {
    if (reload) {
      nextId.current = 0;
      dispatch(getData(currentTable))
        .unwrap()
        .then(res => {
          if (res.length === 0) {
            setDataList([]);
            setMessage("데이터가 없습니다.");
            return;
          }
          if (res.length !== 0) {
            setDataList(
              res.map(data => {
                nextId.current += 1;
                return { clientId: nextId.current, ...data };
              }),
            );
            setMessage("");
          }
        })
        .catch(e => {
          console.log(e);
          setDataList([]);
          setMessage("데이터 불러오기에 실패했습니다.");
        });
      setReload(false);
    }
  }, [reload]);

  const addNewData = data => {
    dispatch(
      addData({
        tableName: currentTable,
        rows: deleteKey([data], ["clientId", "createdAt", "updatedAt"]),
      }),
    )
      .unwrap()
      .then(() => {
        setReload(true);
        setMessage("");
      })
      .catch(e => {
        console.log(e);
        setDataList([]);
        setMessage("데이터 추가에 실패했습니다.");
      });
  };

  const remove = (remove, pk) => {
    dispatch(
      removeData({
        tableName: currentTable,
        [searchKeyPK(schemaKey)]: pk,
      }),
    )
      .unwrap()
      .then(() => {
        setReload(true);
        setMessage("");
      })
      .catch(e => {
        console.log(e);
        setDataList([]);
        setMessage("데이터 삭제에 실패했습니다.");
      });
  };

  const newData = () => {
    nextId.current += 1;
    setDataList([...dataList, { clientId: nextId.current, ...attributes }]);
  };

  return !isLoading && attributes && !reload ? (
    <>
      <h2 className="dataListTitle">{currentTable} 테이블의 데이터 목록</h2>
      {message === "" ? (
        <>
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
        <div className="error">{message}</div>
      )}
    </>
  ) : (
    <Loading />
  );
}
