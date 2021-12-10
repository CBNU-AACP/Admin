/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import cx from "classnames";
import http from "../../../common/axios";
import "./style.scss";

export default function DataCard({ isNew, data, id, add, remove }) {
  const schema = useSelector(state => state.table.currentSchema);

  const [msgState, setMsgState] = useState("");
  const [isAddClick, setIsAddClick] = useState(false);

  useEffect(() => {
    if (isNew && !isAddClick) {
      setMsgState("입력 중");
      return;
    }
    if (!isNew) {
      setMsgState("");
      return;
    }
    if (isAddClick && isNew) setMsgState("추가 중");
  }, [isNew, isAddClick]);

  return (
    <div className="dataCard">
      <div className="btnBox">
        {!isAddClick && (
          <>
            <div
              className="circle drop"
              onClick={() => remove(id)}
              aria-hidden="true"
            />
            <p className="text">삭제</p>
          </>
        )}
        <p className="dataText">{msgState}</p>
      </div>
      {!isAddClick && isNew ? (
        <>
          <table className="attributeList">
            {Object.keys(schema).map((attribute, index) => (
              <tr className="attribute">
                <td className="attribute column">{attribute}</td>
                <td className="attribute">
                  <input
                    className="input"
                    type="text"
                    autoFocus={index === 0}
                    placeholder={`${attribute}`}
                    onChange={e => {
                      data[attribute] = e.target.value;
                    }}
                  />
                </td>
              </tr>
            ))}
          </table>
          <div className="btnBox addBox">
            <div
              className="circle add"
              onClick={() => {
                add(data);
                setIsAddClick(true);
              }}
              aria-hidden="true"
            />
            <p className="text">완료</p>
          </div>
        </>
      ) : (
        <table className="attributeList">
          {Object.keys(schema).map(attribute => (
            <tr>
              <td className="attribute column">{attribute}</td>
              <td className="attribute">{data[attribute]}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}
